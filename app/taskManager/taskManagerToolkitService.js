angular.module('app.taskManager').service('taskManagerToolkitService', function(){

    this.searchFilter = function(task, searchExpression){
        if (searchExpression == "" || searchExpression == null) {
            return true;
        }
        var matchOnTitle, matchOnCategory, matchOnPriority, matchOnContent, matchOnDate, titleString, categoryString, priorityString, contentString, dateString, expr;
        titleString = '' + task.title;
        categoryString = '' + task.category;
        priorityString = '' + task.priority;
        contentString = '' + task.content;
        dateString = '' + task.date;
        expr = searchExpression.toLowerCase();

        if (titleString.toLowerCase().indexOf(expr) >= 0) {
            return true;
        }
        if (categoryString.toLowerCase().indexOf(expr) >= 0) {
            return true;
        }
        if (priorityString.toLowerCase().indexOf(expr) >= 0) {
            return true;
        }
        if (contentString.toLowerCase().indexOf(expr) >= 0) {
            return true;
        }
        if (dateString.toLowerCase().indexOf(expr) >= 0) {
            return true;
        }
        return false;
    }
});