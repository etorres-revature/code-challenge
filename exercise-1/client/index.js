let data;
$.ajax({
  url: "https://5dc588200bbd050014fb8ae1.mockapi.io/assessment",
  type: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  success: function (response) {
    console.log(response);
    data = response;
    console.log("this is data: ", data);
  },
}).then((data) => {
  let newData = $.each(data, function (index, element) {
    let newDate = new Date(element.createdAt);

    newDate = newDate.toDateString();

    element.createdAt = newDate;
  });

  let html = `<ul>
  {{#each data}}
  <li>
    id: {{id}}; name: {{name}}; avatar: {{avatar}}; date created: {{createdAt}}
  </li>
  </br>
  {{/each}}
</ul>`;

  let template = Handlebars.compile(html);

  let handlebar = template({ data });
  console.log("handlebar:", handlebar);

  $("#data").html(handlebar);
});
