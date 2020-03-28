$(document).ready(function(){
    $("#testing-centers").click(function(){
        $(this).parent().hide();
        $("#testing-data").css("display","block");
        $("#goback").css("display","block");
    })
    $("#helpline-numbers").click(function(){
        $(this).parent().hide();
        $("#helpline-data").css("display","block");
        $("#goback").css("display","block");
    })
    $("#symptom-checker").click(function(){
        $(this).parent().hide();
        $("#tab-content").show();
        $("#symptom-data").css("display","block");
        $("#goback").css("display","block");
    })
    $("#goback").click(function(){
        $(this).hide();
        $(".main-tabs").show();
        $("#symptom-data").css("display","none");
        $("#helpline-data").css("display","none");
        $("#testing-data").css("display","none");

    })
})

var json = {
    title: " ",
    showProgressBar: "bottom",
    goNextPageAutomatic: true,
    showNavigationButtons: false,
    pages: [
        {
            questions: [
                {
                type: "radiogroup",
                title: 'For whom are you taking this test?',
                choices: ['For yourself', 'Parent', 'Spouse', 'Child', 'Someone else']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'What is your gender?',
                choices: ['Male', 'Female', 'Other']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'What is your age-group?',
                choices: ['Less than 12 years', '12 - 50 years', '51 - 60 years', 'Above 60 years']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'Do you have any of these health conditions?',
                choices: ['Asthma', 'Chronic lung disease (COPD)', 'Diabetes', 'Heart Diseases', 'Immuno-compromised conditions', 'Pregnancy', 'None of the above']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'Have you or someone in your family visited any of the below countries in the last 14 days?',
                choices: ['China','Italy','Spain','Iran','Europe','Middle East','Southeast Asia','Country not listed above','None of the above']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'Have you or someone in your family travelled within India in public transport and came in close contact with someone with cough, cold, fever and shortness of breath in the last 14 days?',
                choices: ['Yes', 'No']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'Have you or someone in your family come in close contact with a confirmed COVID-19 patient in the last 14 days?',
                choices: ['Yes', 'No']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'Do you have fever?',
                choices: ['Yes', 'No']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'Do you have headache?',
                choices: ['Yes', 'No']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'Do you have cough?',
                choices: ['Yes', 'No']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'Do you have a cold?',
                choices: ['Yes', 'No']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'Do you have sore throat?',
                choices: ['Yes', 'No']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'Do you feel shortness of breath?',
                choices: ['Yes', 'No']
                }
            ]
        }, {
            questions: [
                {
                type: "radiogroup",
                title: 'Do you have coarseness in voice?',
                choices: ['Yes', 'No']
                }
            ]
        }
    ],
    // completedHtml: "Thankyou"
};
var dataarr = [];
var i, flag = 0;
window.survey = new Survey.Model(json);

survey.onComplete
    .add(function (result) {
        // document
        //     .querySelector('#surveyResult')
            // .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
                        forEach(result.data, function (value, index) {
                                // console.log("Question:"+index+" Answer: " + value); // A, B, C, D
                                dataarr.push(value);
                        });
                        if(dataarr[5] === 'Yes' || dataarr[6] === 'Yes' || dataarr[7] === 'Yes' || dataarr[8] === 'Yes' || dataarr[9] === 'Yes' || dataarr[10] === 'Yes' || dataarr[11] === 'Yes' || dataarr[12] === 'Yes' || dataarr[13] === 'Yes') {
                            flag++;
                        }
                        
                        if(flag == 1) {
                            console.log(flag);
                            }
                        
                        $('#surveyResult').css("display", "block");
                        var txt2 = document.getElementById("red-text");
                        var txt3 = document.getElementById("advise");
                    
                        if( flag == 1) {
                            txt2.innerHTML = 'High Risk (With Symptoms)';
                            txt3.innerHTML = "Seek immediate evaluation from a doctor. Notify medical services. Contact MOH&FW helpline for testing. Avoid any travel unless absolutely necessary.​"
                        } else if(dataarr[4] === 'China' || dataarr[4] === 'Italy' || dataarr[4] === 'Spain' || dataarr[4] === 'Iran' || dataarr[4] === 'Europe' || dataarr[4] === 'Middle East' || dataarr[4] === 'Southeast Asia' || dataarr[4] === 'Country not listed above') {
                            txt2.innerHTML = 'High Risk (Without Symptoms)';
                            txt3.innerHTML = 'Home quarantine for 14 days. Avoid public activities outside home. Monitor your health daily for any active symptoms. Avoid any travel unless absolutely necessary.​';
                        } else  {
                            txt2.innerHTML =  'Low Risk';
                            txt3.innerHTML = 'Practice personal hygiene as a preventive measure. Avoid public activities outside home. Avoid any travel unless necessary.';
                        }
    });
    
var forEach = function (collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
                for (var prop in collection) {
                        if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                                callback.call(scope, collection[prop], prop, collection);
                        }
                }
        } else {
                for (var i = 0, len = collection.length; i < len; i++) {
                        callback.call(scope, collection[i], i, collection);
                }
        }
};

$("#surveyElement").Survey({model: survey});



$("refresh").click(function(){
    dataarr.splice(0, dataarr.length);
    window.survey = new Survey.Model(json);
})
