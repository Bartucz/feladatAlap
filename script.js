$(function(){
    const termekek=[];
    jsonbeolvas("jsontermekek.json",termekek, tablaba);

    function jsonbeolvas(fajlnev, tomb, callback)
    {
      $.ajax
        (
            { url: fajlnev, 
                success: function(result)
                {
                    result.forEach((value) => {tomb.push(value);});
                    callback();                                      
                }
            }
        );
    }

    function tablaba()
    {
        $("article div").eq(0).append("<table>");
        var txt="<tr id='fejlec'><th>Terméknév</th><th>Leírás</th><th>Készlet</th><th>Ár</th></tr>";
        
        termekek.forEach(function(value, index){
            
            txt += "<tr id='" + index + "'>";
            
            for (let item in value) {
                
              txt += "<td>" + value[item] + "</td>";
            }
            txt+='<td class="modosit" id="'+(index)+'"><form><input type="button" name="modosit" value="Módosít"></form></td>';
            txt+='<td class="torol" id="'+(index)+'"><form><input type="button" name="torol" value="Töröl"></form></td>';
            txt += "</tr>";
            
        });
        $("article table").html(txt);
        $(".modosit").on("click",  formbaTolt);
        $(".torol").on("click",  Torles);
    }
    function formbaTolt(){
        
        
        index=$(this).attr("id");
    
        $("#termeknev").attr("value", termekek[index].Terméknév);
        $("#leiras").attr("value", termekek[index].Leírás);
        $("#keszlet").attr("value", termekek[index].Készlet);
        $("#ar").attr("value", termekek[index].Ár);
        $("#ok").on("click",  csere);
    }

    function Torles(){
        index=$(this).attr("id");
        termekek.splice(index,1);
        $("article div").eq(0).empty();
        tablaba();
        


    }


});