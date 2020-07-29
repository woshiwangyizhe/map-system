function PriorityQueue() {
    let items = [];
    function QueueElement(ele, priority) {
        this.ele = ele;
        this.priority = priority;
    }
    this.enqueue = function(ele, priority) {
        let queueElement = new QueueElement(ele, priority);
        let added = false;
        for(let i = 0; i< items.length; i++) {
            if(queueElement.priority < items[i].priority) {
                items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if(!added) {
            items.push(queueElement);
        }
    };
    this.print = function() {
        for(let i = 0;i < items.length; i++) {
            console.log(`${items[i].priority} - ${items[i].ele}`)
        }
    };
}
