
  let homepage = document.getElementById("home");

  homepage.addEventListener("click", (req, res) => {
    window.location.href = "./index.html";
  });

  let movie = document.getElementById("movie");

  movie.addEventListener("click", (req, res) => {
    window.location.href = "./moviepage.html";
  });
  movie;
  let createplaylist = document.getElementById("create_playlsit");
  const currUser = JSON.parse(localStorage.getItem("user"));

  const popupForm = document.getElementById("popupForm");

  createplaylist.addEventListener("click", () => {
    popupForm.style.display = "block"; // Show the popup
  });

  popupForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Handle form submission here

    popupForm.style.display = "none"; // Hide the popup after submission
  });

 
  const addPlaylistForm = document.getElementById("popup");
  let cont = document.getElementById("cont");

  const onAdd = () => {
    const payload = {
      userid: currUser._id,
      title: addPlaylistForm[0].value,
      desc: addPlaylistForm[1].value,
      isprivate: addPlaylistForm[2].value,
    };

    console.log(payload);

    fetch("http://localhost:3000/play/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        fetchAndRender(currUser._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
    
  const fetchAndRender = (uid) => {
    fetch(`http://localhost:3000/play/playlistmovie/${uid}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        display(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function display(data) {
    cont.innerHTML = "";

    data.forEach((el) => {
      const list = document.createElement("div");
      list.style.cssText = "border: 1px solid red; width: 20%; height: 20%;padding:10px;border-radius:5px;    background-color: rgb(89, 87, 87);";

      const card = document.createElement("div");
      const title = document.createElement("p");
      title.textContent = el.title;

      const btncount = document.createElement("p");
      btncount.textContent = el.isprivate ? "Private" : "Public";

      const btnprivate = document.createElement("p");
      btnprivate.textContent = `${el.playList.length} tracks`;

      card.addEventListener("click", () => {
        fetchAndRender(el._id);
      });

      card.append(title, btncount, btnprivate);

      const dec = document.createElement("p");
      dec.textContent = el.desc;

      dec.addEventListener("click", () => {
        fetchAndRender(currUser._id);
      });

      list.append(card, dec);
      console.log(list)
      cont.append(list);
    });
  }

  window.addEventListener("load", () => {
    fetchAndRender(currUser._id);
  });


  

