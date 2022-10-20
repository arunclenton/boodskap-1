var domainKey = "MIPPCMEXKG";
var apiKey = "dcXxnjeNZwX9";
var token = "d2fb6f5a-c77a-4204-ae14-d0043031848a";
var url = "https://onprem.boodskap.io";
var RECORD_ID = 6500;

$(document).ready(function () {
    listdata()
    // register()
    // myDelete()
    $("input").keydown(function(){
        $("this").css("border-color","red")
    });
    
    $("input").keyup(function(){
        $("this").css("border-color","green")
    });
})
// function (){
// input.css("border-color","green");
// }
// $("input").keydown(function(){
//     $("this").css("border-color","green")
// });

function numberfun(input){
    var number =/[^0-9]/;
    input.value = input.value.replace(number,"");
}

function register() {
    console.log("add")
    var firstname = $("#first").val();
    var lastname = $("#last").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var age = $("#age").val();
    var country = $("#country").val();
    // var name1 = $("name1");
    // var name2 = $("name2");
    // var name3 = $("name3");
    // var name4 = $("name4");
    // var name5 = $("name5");
    // var name6 = $("name6");
    var email1 = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)([a-z]+)?$/;
    var phonenumber =/^\d{10}$/;

    if (firstname == "") {
        $("#name1").html("*enter your first name*");
        $("#first").css("border-color", "red")
        return false;
    } else {
        $("#name1").html("");
        $("#first").css("border-color", "green")
    }

    if (lastname == "") {
        $("#name2").html("*enter last name*");
        $("#last").css("border-color", "red")
        return false;
    } else {
        $("#name2").html("");
        $("#last").css("border-color", "green")
    }
    if (email == "") {
        $("#name3").html("*pleace enter email*");
        $("#email").css("border-color", "red")
        return false;
    } else if ((email.match(email1))) {
       
        $("#name3").html("")
        $("#email").css("border-color", "green")
    }
    else {
        $("#name3").html("*valid email*");
    }
    // var char =String.fromCharCode(evt.which);
    if(phone == "") {
        $("#name4").html("*enter your phone number*");
        $("#phone").css("border-color", "red")
    }
    else if (phone.length <= 10 && phone != 10) {
        $("#name4").html("")
        $("#phone").css("border-color", "green")
    }
   
    else {
        $("#name4").html("*valid phone number*");
        $("#phone").css("border-color", "red")
       
    }
    if (age == "") {
        $("#name5").html("*enter your age*");
        $("#age").css("border-color", "red")
        return false;
    } else {
        $("#name5").html("");
        $("#age").css("border-color", "green")
    }
    if (country == "") {
        $("#name6").html("*select your country*");
        $("#country").css("border-color", "red")
        return false;
    } else {
        $("#name6").html("")
        $("#country").css("border-color", "green")
    }
    var idvalue = $("#id-value").val();
    if (idvalue) {
        // update 
        console.log(idvalue);
        var dynamic_url = url + "/api/record/insert/static/" + token + "/" + RECORD_ID + "/" + idvalue;
        // methodName :"PUT";
        console.log("arun");


    }
    else {
        // get
        var dynamic_url = url + "/api/record/insert/dynamic/" + token + "/" + RECORD_ID;
        // methodName :"POST" 

        console.log("clenton");
    }

    // console.log(firstname);
    // console.log(country);

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

        url: dynamic_url,
        method: 'POST',
        data: stringifydata,
        contentType: 'text/plain',
        success: function (stringifydata) {
            console.log(stringifydata);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        },
        error: function () {
            console.log(error);
        }
    })
}

function listdata() {
    var queryvalue = {
        query: '{\n"size":50\n}',
        type: "RECORD",
        specId: 6500
        // \n  \"query\":{\n    \"match_all\":{\n      \n    }\n  }\n
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
            var tbody = $("#tbody")
            // // $(document).ready(function () {
            //     $("#table_id").DataTable({
            //         retrieve: true,

            //         destroy: true,
            //         // //  count = 0+index ,
            //         data: hits,
            //         columns: [
            //             // {data:count},
            //             { data: "_source.firstname" },
            //             { data: "_source.lastname" },
            //             { data: "_source.email" },
            //             { data: "_source.phone" },
            //             { data: "_source.age" },
            //             { data: "_source.country" },
            //             { data: "_id", className: 'btn-edit', render: function (_id) { return "<button onclick=\"edit('" + _id + "')\">Edit</button>" } },
            //             // {data:"_id", render:function(_id){return "<button onclick=\"updateid('"+_id+"')\">Upadte</button>"}},
            //             { data: "_id", className: 'btn-delete', render: function (_id) { return "<button onclick=\"mydelete('" + _id + "')\">Delete</button>" } }
            //         ],
            //         "pageLength": 3
            //         // console.log(datatable);

            //     });
            // // });

            tbody.empty();
            hits.forEach((element,) => {
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
                    "</td><td><button class='btn-edit' onclick = \"myEdit('" +
                    id +
                    "')\">Edit</button></td><td><button class='btn-delete' onclick = \"myDelete('" +
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

function myEdit(id) {
    $.ajax({
        url:
            "https://onprem.boodskap.io/api/record/get/" +
            token +
            "/" +
            RECORD_ID +
            "/" +
            id,
        method: "GET",
        datatype: "json",
        success: function (data) {
            $("#id-value").val(id);
            console.log(id);
            $("#first").val(data.firstname);
            $("#last").val(data.lastname);
            $("#age").val(data.age);
            $("#phone").val(data.phone);
            $("#email").val(data.email);
            $("#country").val(data.country);

            console.log(data);
            // console.log(iid);
            alert("sumbit");
        },
        error: function (data) {
            alert("error");
            console.log(data);
        },
    });
}


function myDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            $.ajax({
                url:
                    url + "/api/record/delete/" + token + "/" + RECORD_ID + "/" + id,
                type: "DELETE",
                contentType: "text/plain",
                success: function (response) {
                    console.log(response);
                    // alert("success");
                    console.log(id);
                },
                error: function () {
                    alert("not delete");
                    console.log();
                },
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })

    console.log(id);
    // $.ajax({
    //     url:
    //         url + "/api/record/delete/" + token + "/" + RECORD_ID + "/" + id,
    //     type: "DELETE",
    //     contentType: "text/plain",
    //     success: function (response) {
    //         console.log(response);
    //         // alert("success");
    //     },
    //     error: function () {
    //         alert("errro");
    //         console.log();
    //     },
    // });
}




