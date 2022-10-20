var domainKey = "MIPPCMEXKG";
var apiKey = "dcXxnjeNZwX9";
var token = "a31f4b8e-f637-4cf7-a419-9fdc0281f4d9";
var url = "https://onprem.boodskap.io";
var RECORD_ID = 6500;

$(document).ready(function () {
    listdata()
})


function register() {
    var idvalue = document.getElementById("id-val").value;
    var firstname = document.getElementById("first").value;
    var lastname = document.getElementById("last").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var age = document.getElementById("age").value;
    var country = document.getElementById("country");
    // var name1 = document.getElementById("name1");
    // var name2 = document.getElementById("name2");
    // var name3 = document.getElementById("name3");
    // var name4 = document.getElementById("name4");
    // var name5 = document.getElementById("name5");
    // var name6 = document.getElementById("name6");
    // var phonepartten = "[0-9]{3}-[0-9]{2}-[0-9]{3}";
    // var emailpartten = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    if (idvalue) {
        // update 
        console.log(idvalue);
        var dynamic_url = url + "/api/record/insert/static/" + token + "/" + RECORD_ID + "/" + idvalue;


    } else {
        // get
        var dynamic_url = url + "/api/record/insert/dynamic/" + token + "/" + RECORD_ID;

    }
    // if (firstname.value == "") {
    //     name1.innerText = "*please enter first name*";

    //     return false;
    // }
    //    else if (lastname.value == "") {
    //         name2.innerText = "*please enter last name*";

    //         return false;
    //     } 
    //    else if (email.value == emailpartten) {
    //         name3.innerText = "*please enter correct Email*";

    //         return false;
    //     } 

    //     else if (phone.value== phonepartten) {
    //         name4.innerText = "*please enter correct number*";

    //         return false;
    //     } 
    //    else if (age.value == "") {
    //         name5.innerText = "*please enter age*";

    //         return false;
    //     } 
    //    else if (country.value == "") {
    //         name6.innerText = "*select your country*";

    //         return false;
    //     } 

    console.log(firstname);
    console.log(country);

    var querydata = {
        "age": age,
        "country": country,
        "email": email,
        "firstname": firstname,
        "phone": phone,
        "lastname": lastname
    }
    var stringifydata = JSON.stringify(querydata);
    $.ajax({
        url: url + "/api/record/insert/dynamic/" + token + "/" + RECORD_ID,
        method: 'POST',
        data: stringifydata,
        contentType: 'text/plain',
        success: function (stringifydata) {
            console.log(stringifydata);
        },
        error: function (request, msg, error) {
            console.log(error);
        }
    })
}

function listdata() {
    var queryvalue = {
        query: "{\n  \"query\":{\n    \"match_all\":{\n      \n    }\n  }\n}",
        type: "RECORD",
        specId: 6500
    };
    $.ajax({
        url: url + "/api/elastic/search/query/" + token + "/RECORD?specId=" + RECORD_ID,
        type: 'RECORD',
        method: 'POST',
        data: JSON.stringify(queryvalue),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            var jsondata = JSON.parse(data.result);
            var hits = jsondata.hits.hits;
            console.log(hits);

            //looping all data...
            var tbody=$("tbody");
            tbody.empty();
            $(document).ready(function () {
                $('#table').DataTable();
            });
       
            tbody.empty();
            hits.forEach((element, index) => {
                var id = element._id;
                var code = element._source;
                //  var count = index+1;
                console.log(id);
                tbody.append(
                    "<tr><td>" +
                    //   count +
                    // "<td><td>" +
                    code.firstname +
                    "</td><td>" +
                    code.lastname +
                    "</td><td>" +
                    code.age +
                    "</td><td>" +
                    code.phone +
                    "</td><td>" +
                    code.email +
                    "</td><td>" +
                    code.country +
                    "</td><td><button onclick = \"myEdit('" +
                    id +
                    "')\">Edit</button></td><td><button onclick = \"myDelete('" +
                    id +
                    "')\">delete</button></td></tr>"
                );
            console.log(element);
            console.log(id);
        });
},
error: function () {
    alert("error");
},
    });
}

// function myEdit(id) {
//     $.ajax({
//         url:
//             "https://onprem.boodskap.io/api/record/get/" +
//             token +
//             "/" +
//             RECORD_ID +
//             "/" +
//             id,
//         method: "GET",
//         datatype: "json",
//         success: function (data) {
//             $("#id-val").val(id);
//             console.log(id)
//             $("#first").val(data.firstname);
//             $("#last").val(data.lastname);
//             $("#age").val(data.age);
//             $("#phone").val(data.phone);
//             $("#email").val(data.email);
//             $("#country").val(data.country);

//             console.log(data);
//             // console.log(iid);
//             alert("got it");
//         },
//         error: function (data) {
//             alert("error");
//             console.log(data);
//         },
//     });
// }

// function myDelete(id) {

//     console.log(id);
//     $.ajax({
//         url:
//             url + "/api/record/delete/" + token + "/" + RECORD_ID + "/" + id,
//         type: "DELETE",
//         contentType: "text/plain",
//         success: function () {
//             alert("success");

//         },
//         error: function () {
//             alert("errro");
//             console.log();
//         },
//     });
// }




