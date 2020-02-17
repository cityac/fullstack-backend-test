function fetchData() {

  const AUTHHEADER = new Headers({'Content-Type': 'application/json'})

  const CONFIG = {
      method: 'GET',
      headers: AUTHHEADER,
  }

  fetch('/posts/', CONFIG)
    .then(function(res) {
    return res.json();
  }).then(function(posts) {
    posts.forEach(post => {
      addRow(post)
    });
  }).catch(function(error) {
      console.log('error = ' + error)
  })
}

function addRow(content)
{
        if (!document.getElementsByTagName) return;

        let tabBody=document.getElementsByTagName("tbody").item(0);
        let row=document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");
        let textnode1=document.createTextNode(content._id);
        let textnode2=document.createTextNode(content.title);
        let textnode3=document.createTextNode(content.body);
        let textnode4=document.createTextNode(content.user.name);
        cell1.appendChild(textnode1);
        cell2.appendChild(textnode2);
        cell3.appendChild(textnode3);
        cell4.appendChild(textnode4);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        tabBody.appendChild(row);
}

fetchData();