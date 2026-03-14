function asyncPool(limit, tasks) {
    return new Promise((resolve, reject) => {
        const results = [];
        let countActiveTasks = 0;
        let indexRunTask = 0;

        function runTask() {
            if (indexRunTask === tasks.length && countActiveTasks === 0) {
                resolve(results);
                return;
            }

            while (countActiveTasks < limit && indexRunTask < tasks.length) {
                const currentIndex = indexRunTask;
                countActiveTasks++;
                indexRunTask++;

                tasks[currentIndex]().then((result) => {
                    results.push(result);
                }).catch(() => {
                    reject();
                }).finally(() => {
                    countActiveTasks--;
                    runTask();
                });
            }
        }

        runTask();
    })
}

const tasks = [
    () => new Promise(res => setTimeout(() => {
        res(1)
    }, 1000)),
    () => new Promise(res => setTimeout(() => {
        res(2)
    }, 300)),
    () => new Promise(res => setTimeout(() => {
        res(3)
    }, 600)),
    () => new Promise(res => setTimeout(() => {
        res(4)
    }, 500)),
    () => new Promise(res => setTimeout(() => {
        res(5)
    }, 100))
];

asyncPool(2, tasks).then(results => console.log(results));



