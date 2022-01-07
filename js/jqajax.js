$(document).ready(function () {




    function maxid() {
        $.ajax({
            url: "maxid.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.maxid==null)
                {
                    $("#id").val(1); 
                }
                else{
                    $("#id").val(parseInt(data.maxid)+1);
                }
               


            },
        });
    }
    maxid();


    $("#btnreset").click(function () {
        if(flag1==0)
        {
            $("#btnadd").attr("disabled", true); 
        }
        else {
            $("#btnadd").attr("disabled", false);
        }
        ("#myform")[0].reset();
        $("#flag1").val(1);
        maxid();

    });


    function showdata() {
        output = "";
        $.ajax({
            url: "retrieve.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data) {
                    x = data;
                }
                else { x = " "; }
                for (i = 0; i < x.length; i++) {
                    output += "<tr><td>" + x[i].id + "</td><td>" + x[i].name
                        + "</td><td>" + x[i].branch + "</td><td>" + x[i].mobile
                        + "</td><td>   <button class ='btn btn-warning btn-sm btn-edit' data-sid=" + x[i].id + ">Edit </button> <button class ='btn btn-danger btn-sm btn-del' data-sid=" + x[i].id + ">Delete</button> <button class ='btn btn-success btn-sm btn-view' data-sid=" + x[i].id + ">View</button></td></tr> ";
                }
                $("#tbody").html(output);

                var msg="aman";
                msg+="\n attach:"+"file";
                console.log(msg);
            },
        });
    }
    showdata();


    $("#btnadd").click(function (e) {
        e.preventDefault();
        let id = $("#id").val();
        let nm = $("#name").val();
        let bn = $("#branch").val();
        let mb = $("#mobile").val();
        let flag=$("#flag").val();
        let url;
        if(flag==0)
        {
            url="insert.php";
        }
        else{
            url="update.php";
        }
        mydata = { id: id, name: nm, branch: bn, mobile: mb };
        $.ajax({
            url: url,
            method: "POST",
            data: JSON.stringify(mydata),
            


            success: function (data) {
                msg = "<div class='alert alert-dark mt-3'>" + data + "</div";
                $("#msg").html(msg);
                $("#myform")[0].reset();
                $("#flag").val(0);
                showdata();
                maxid();

            },
        });
    });



    






    $("tbody").on("click", ".btn-del", function () {
        let id = $(this).attr("data-sid");
        mydata = { sid: id };
        $.ajax({
            url: "delete.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success: function (data) {
                msg = "<div class='alert alert-dark mt-3'>" + data + "</div";
                $("#msg").html(msg);
                showdata();
                maxid();
            },
        });
    });


    $("tbody").on("click", ".btn-edit", function () {
        let id = $(this).attr("data-sid");

       

        if(flag1==0 )
        {
            $("#btnadd").attr("disabled", false);
            flag1=1; 
        }
        else 
        {
            $("#btnadd").attr("disabled", false); 
            flag1=0;
           
        }
       

        mydata = { sid: id };
        $.ajax({
            url: "edit.php",
            method: "POST",
            dataType: "json",
            data: JSON.stringify(mydata),
            success: function (data) {
                $("#id").val(data.id);
                $("#name").val(data.name);
                $("#branch").val(data.branch);
                $("#mobile").val(data.mobile);
                $('#flag').val(1);
                $('#flag1').val(0);
                $('#flag2').val(0);
            },
        });
    });



    $("tbody").on("click", ".btn-view", function () {
        let flag1= $("#flag1").val();
        
        
        console.log(flag1);
        
        if(flag1==0)
        {
            $("#btnadd").attr("disabled", true);
            flag1=0;    
        }
        else {
            $("#btnadd").attr("disabled", true);
            flag1=1;

        }
      
        
        
        
        let id = $(this).attr("data-sid");
        mydata = { sid: id };
        $.ajax({
            url: "edit.php",
            method: "POST",
            dataType: "json",
            data: JSON.stringify(mydata),
            success: function (data) {
                $("#id").val(data.id);
                $("#name").val(data.name);
                $("#branch").val(data.branch);
                $("#mobile").val(data.mobile);
                $('#flag1').val(1);
                $('#flag2').val(1);

            },

        });
    });

});