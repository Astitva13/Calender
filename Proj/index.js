var activeee,flag=0;

window.onload = function()
{
    var d = new Date();
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    for(var i=0;i<12;i++)
        {
            document.getElementById("mo-sel").innerHTML += "<option>" + month_name[i] + "</option>";
        }
    var month = d.getMonth();
    var year = d.getFullYear();
    var first_date = month_name[month] + " " + 1 + " " + year;
    var tmp = new Date(first_date).toDateString();
    var first_day = tmp.substring(0,3);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var day_no = day_name.indexOf(first_day);
    var days = new Date(year,month+1,0).getDate();
    if(month !=0 ) 
    {
        var prevMonth_days = new Date(year,month,0).getDate();
    }
    else
    {
        var prevMonth_days = new Date(year,12,0).getDate();
    }
    var calender = get_calender(day_no,days,prevMonth_days);
    document.getElementById("mo-sel").value = month_name[month];
    document.getElementById("yr-sel").value = year;
    document.getElementById("mo-yr").innerHTML =month_name[month] + " " +year ;
    document.getElementById("tbl").appendChild(calender);
    ultra();
}

function get_calender(day_no,days,prevMonth_days)
{
    var table = document.createElement('table');
    table.setAttribute("id","inside_table");
    var tr = document.createElement('tr');
    for (var i=0;i<7;i++)
        {
            var td =document.createElement('td');
            var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            td.innerHTML = day_name[i].toLocaleUpperCase();
            tr.appendChild(td);
        }
    table.appendChild(tr);
    var tr = document.createElement('tr');
    var i;
    for(i=0;i<7;i++)
        {
            if(i==day_no)
                {break;}
        }
    var xt = i-1;
    for(i=0;i<7;i++)
        {
            if(i==day_no)
                {break;}
            var td = document.createElement('td');
            //td.setAttribute("class","el");
            td.innerHTML = prevMonth_days-xt;
            td.setAttribute("id","prev_date");
            tr.appendChild(td);
            xt--;
        }
    table.appendChild(tr);
    var count = 1;
    for(;i<7;i++)
        {
            var td = document.createElement('td');
            td.setAttribute("class","el");
            td.innerHTML = count;
            td.setAttribute("id","el"+count);
            td.setAttribute("onclick","active_change("+count+")");
            count++;
            tr.appendChild(td);
        }
    xt =100;
    for(var j=0;j<7;j++)
        {
            tr = document.createElement('tr');
            for(var k=0;k<7;k++)
                {
                    if(count>days && k==0)
                        {
                            table.appendChild(tr);
                            return table;
                        }
                    else if(count>days)
                        {
                            if(count>10 && xt>10) xt=1;
                            var td = document.createElement('td');
                            //td.setAttribute("class","el");
                            td.innerHTML = xt;
                            td.setAttribute("id","prev_date");
                            xt++;
                            tr.appendChild(td);        
                        }
                    else 
                    {
                        var td = document.createElement('td');
                        td.setAttribute("class","el");
                        td.innerHTML = count;
                        td.setAttribute("id","el"+count);
                        td.setAttribute("onclick","active_change("+count+")");
                        count++;
                        tr.appendChild(td);
                    }
                }
            table.appendChild(tr);
        }
}

function print_cal(month,year)
{
    document.getElementById("yr-sel").value = year;
    document.getElementById("mo-sel").value  = month;
    document.getElementById("mo-yr").innerHTML = month+" "+year;
    document.getElementById("tbl").innerHTML = "";
    var d = new Date();
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var first_date = month + " " + 1 + " " + year;
    var tmp = new Date(first_date).toDateString();
    var first_day = tmp.substring(0,3);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var day_no = day_name.indexOf(first_day);
    var month_idx = month_name.indexOf(month);
    var days = new Date(year,month_idx+1,0).getDate();
    if(month_idx !=0 ) 
    {
        var prevMonth_days = new Date(year,month_idx,0).getDate();
    }
    else
    {
        var prevMonth_days = new Date(year,12,0).getDate();
    }
    var calender = get_calender(day_no,days,prevMonth_days);
    document.getElementById("tbl").appendChild(calender);
    ultra();
}

function empty_yr()
{
    if(document.getElementById("yr-sel").value == "Enter Year")
        document.getElementById("yr-sel").value = "";
}

function change_yr()
{
    var year,month;
    if(document.getElementById("yr-sel").value == "Enter Year")
        document.getElementById("yr-sel").value = "";
    else
        {
            month = document.getElementById("mo-yr").innerHTML.split(" ")[0];
            year = document.getElementById("yr-sel").value;
        }
    print_cal(month,year);
}

function change_mo()
{
    var year,month;
    if(document.getElementById("mo-sel").value=="Select Month")
        {
            alert("Please Select Month!");
        }
    else
        {
            month = document.getElementById("mo-sel").value;
            if(document.getElementById("yr-sel").value=="Enter Year")
                {
                    year = document.getElementById("mo-yr").innerHTML.split(" ")[1];
                }
            else
                {
                    year = document.getElementById("yr-sel").value;
                }
        }
    print_cal(month,year);
}

function ultra()
{
var today = new Date();
var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
if(document.getElementById("mo-yr").innerHTML.split(" ")[0] == month_name[today.getMonth()] 
   && document.getElementById("mo-yr").innerHTML.split(" ")[1] == today.getFullYear())
    {
        document.getElementById("el"+today.getDate()).setAttribute("class","today");
        activeee = today.getDate();
        flag = 1;
    }
else {document.getElementById("el"+activeee).setAttribute("class","activee");}
    document.getElementById("date").innerHTML = activeee;
var act = new Date(document.getElementById("mo-yr").innerHTML.split(" ")[0]+" "+activeee+" "+document.getElementById("mo-yr").innerHTML.split(" ")[1]);
    var day_name = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    document.getElementById("day").innerHTML=day_name[act.getDay()];
}

function active_change(count)
{
    var today = new Date();
    if(flag==1)
        {
            flag=0;
            document.getElementById("el"+today.getDate()).setAttribute("class","today-noshdw");
        }
    else
        {
            flag=0;
            document.getElementById("el"+activeee).setAttribute("class","el");
        }
    document.getElementById("el"+count).setAttribute("class","activee");
    activeee = count;
    document.getElementById("date").innerHTML = activeee;
    var act = new Date(document.getElementById("mo-yr").innerHTML.split(" ")[0]+" "+activeee+" "+document.getElementById("mo-yr").innerHTML.split(" ")[1]);
    var day_name = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    document.getElementById("day").innerHTML=day_name[act.getDay()];
}

function incrmo()
{
    var month =document.getElementById("mo-yr").innerHTML.split(" ")[0];
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    if(month_name.indexOf(month)<11)
        {
            document.getElementById("mo-sel").value = month_name[month_name.indexOf(month)+1];
            console.log(month_name[month_name.indexOf(month)+1]);
        }
    else
        {
            document.getElementById("mo-sel").value = month_name[0];
            document.getElementById("yr-sel").value = Number(document.getElementById("yr-sel").value)+1;
        }
    change_mo();
    change_yr();
}
function decrmo()
{
    var month =document.getElementById("mo-yr").innerHTML.split(" ")[0];
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    if(month_name.indexOf(month)>=1)
        {
            document.getElementById("mo-sel").value = month_name[month_name.indexOf(month)-1];
            console.log(month_name[month_name.indexOf(month)-1]);
        }
    else
        {
            document.getElementById("mo-sel").value = month_name[11];
            document.getElementById("yr-sel").value -= 1;
        }
    change_mo();
    change_yr();
}

function decryr()
{
    document.getElementById("yr-sel").value -= 1;
    change_mo();
    change_yr();
}

function incryr()
{
    document.getElementById("mo-sel").value = document.getElementById("mo-yr").innerHTML.split(" ")[0];
    document.getElementById("yr-sel").value = document.getElementById("mo-yr").innerHTML.split(" ")[1];
    document.getElementById("yr-sel").value = Number(document.getElementById("yr-sel").value)+1;
    change_mo();
    change_yr();
}