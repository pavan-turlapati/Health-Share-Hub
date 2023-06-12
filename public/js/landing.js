(function($) {

    var form = $('#searchDisease');
    var searchTerm = $('#searchInput');
    var resultContainer = $('#resultContainer')

    var profileform = $('#searchProfile');
    var profileSearchTerm = $('#profileSearchInput');
    var ProfileresultContainer = $('#profileResultContainer')

    form.submit(function(event) {
        event.preventDefault();

        st = searchTerm.val();
        if(st[0]=="#")
        {
          st= st.substring(1, st.length);
        }
        st=st.trim();

        if(/^ *$/.test(st))
      {
        $('#error').text("The searchTerm cannot be empty spaces or null").show()
        $('#error2').hide()
        return
      }
     
      if(/^[#\s.]{1,}$/.test(st))
      {
        $('#error').text("Sorry No Match Found.Please try again!").show()
        $('#error2').hide()
        return
      }
      else{
        resultContainer.empty()
        $('#error').hide()
        $('#error2').hide()
      var requestConfig = {
        method: 'GET',
        url: `http://localhost:3000/disease/${st}`
        };

         $.ajax(requestConfig).then(function(responseMessage) {
      console.log(responseMessage)
      disease_list=responseMessage

     

      if(responseMessage.length==0)
      {
        $('#error').text("Sorry No Match Found.Please try again!").show()
        $('#error2').hide()
        return
      }
      else if (disease_list[0].diseaseName==undefined){
        $('#error').text("Sorry No Match Found.Please try again!").show()
        $('#error2').hide()
        return
      }
      else{
      let html=`<ul>`
      for(i=0;i<disease_list.length;i++)
      {
        html = html + `<li><a id="disease_list" href="http://localhost:3000/disease/diseaseID/${disease_list[i].id}"> ${disease_list[i].diseaseName} </a></li>`;
      }

      html = html + `</ul>`
      resultContainer.append(html);
      resultContainer.show();
    }
    });

    }
    });


    profileform.submit(function(event) {
      event.preventDefault();

      st = profileSearchTerm.val();
      if(st[0]=="#")
      {
        st= st.substring(1, st.length);
      }
      st=st.trim();
      if(/^ *$/.test(st))
    {
      $('#error2').text("The searchTerm cannot be empty spaces or null").show()
      $('#error').hide()
      return
    }
    else if(/^[#\s\.]{1,}$/.test(st))
    {
      $('#error2').text("Sorry No Match Found.Please try again!").show()
      $('#error').hide()
      return
    }
    else if(/[^A-Za-z0-9]/g.test(st))
    {
      $('#error2').text("Please enter a valid username!").show()
      $('#error').hide()
      return
    }
    else{
      ProfileresultContainer.empty()
      $('#error2').hide()
      $('#error2').hide()
    var requestConfig = {
      method: 'GET',
      url: `http://localhost:3000/profile/${st}`
      };

       $.ajax(requestConfig).then(function(responseMessage) {
    console.log(responseMessage)
    profile_list=responseMessage

    if(responseMessage==null || responseMessage==undefined)
    {
      $('#error2').text("Sorry No Match Found.Please try again!").show()
      $('#error').hide();
      return;
    }
    else{
    let html=`<ul>`
    console.log(profile_list.username)
    html = html + `<li><a id="disease_list" href="http://localhost:3000/searchProfile/${profile_list.username}"> ${profile_list.firstName} ${profile_list.lastName} </a></li>`;
    

    html = html + `</ul>`
    ProfileresultContainer.append(html);
    ProfileresultContainer.show();
  }
  });

  }
  });


})(window.jQuery);