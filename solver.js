var Solver = function() {}

Solver.prototype.solve = function(walkingDistance, eggs){
    var unfeasableEggs = eggs.filter(function(egg){
        return !(egg <= walkingDistance);
    });
    console.log("There are " + unfeasableEggs.length + " unfeasable eggs");

    if(unfeasableEggs.length == eggs.length) {
        //Short circuit!
    }

    var feasableEggs = eggs.filter(function(egg) {
        return egg <= walkingDistance;
    });

    console.log("We have " + feasableEggs.length + " feasable eggs");
    console.log("They are " + feasableEggs);

    var longestEgg = feasableEggs.reduce(function(max,cur){
        if(cur > max){
            return cur;
        }
        else {
            return max;
        }
    });

    console.log("The longest egg is " + longestEgg);

    var infinateIncubator = [];
    var incubators = [];

    var add = function(a,b) {
        return a + b;
    };

    var validIncubator = function(incubator) {        
        return incubator.length < 4;
    }

    var incubatorCanUse = function(incubator, egg) {
        return validIncubator(incubator) && incubator.reduce(add, 0) + egg < walkingDistance;
    }

    for(var i = 0; i < feasableEggs.length; i++)
    {
        var currentEgg = feasableEggs[i];
        console.log("Working with " + i + "th egg of distance " + currentEgg);

        var currentIncubatorSet = incubators.filter(function(incubator){
            return incubatorCanUse(incubator, currentEgg);
        });

        var bestIncubatorSet = currentIncubatorSet.filter(function(incubator) {
            return incubator.reduce(add, 0) + currentEgg === walkingDistance;
        });

        var bestIncubator = null;
        if(bestIncubatorSet.length > 0){
            bestIncubator = bestIncubatorSet[0];
        }

        //console.log(bestIncubator);
        //console.log(currentIncubatorSet.length);
        if(bestIncubator == null)
        {
            console.log("We didnt find a best one");
            if(currentIncubatorSet.length > 0) {
                console.log("... but we do have a set of incubators to work with!");
                bestIncubator = currentIncubatorSet.reduce(function(min, current) {
                    if(min.reduce(add) < current.reduce(add)){
                        return min;
                    }
                    else {
                        return current;
                    }
                });
            }
        }

        if(bestIncubator == null)
        {
            console.log("We didnt have any to work with, so we need to make a new one");
            bestIncubator = [];
            incubators.push(bestIncubator);
        }

        console.log("We found our best incubator!");
        bestIncubator.push(currentEgg);
        feasableEggs.splice(i,1);

        i--;
    }

    feasableEggs.forEach(function(egg) {
        if(infinateIncubator.reduce(add) + egg > walkingDistance){
            return;
        }
        infinateIncubator.push(egg);
    });

    //In theory, here we might be "all full" here. do ONE LAST PASS.
    //If our infinate incubator is going to walk our total distance already, then just continue
    //but if our infin incubator hasnt traveled far enough, pick the incubator out of our list of incubators
    //whose total distance + infin's current distance < walkingDistance & who has the MOST number of eggs
    if(infinateIncubator.reduce(add, 0) < walkingDistance) {
        var bestIncubatorToRemove = incubators.filter(function(incu) {
            incu.reduce(add) + infinateIncubator.reduce(add, 0) <= walkingDistance;
        }).reduce(function(max, cur){
            if(max.length > cur.length){
                return max;
            }
            else {
                return cur;
            }
        },[]);

        if(bestIncubatorToRemove != null) {
            while(infinateIncubator.reduce(add, 0) < walkingDistance && bestIncubatorToRemove.length > 0){
                var currentEgg = bestIncubatorToRemove.splice(0,1);
                infinateIncubator.push(currentEgg);
            }
        }
    }
    console.log("Solved!");

    return { "unfeasableDistances": unfeasableEggs,
             "infinateDistances" : infinateIncubator,
             "incubatorsAndDistances": incubators };

}

exports.Solver = new Solver();
