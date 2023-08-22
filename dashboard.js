function dashboard() {
    const logo = document.querySelector("a");
    logo.classList.add("active");
  }
  
  // TOGGLE SIDEBAR
  const menuBar = document.querySelector("aside nav .bx.bx-menu");
  const navBar = document.querySelector("section");
  const menu =document.querySelector("aside")
  
  menuBar.addEventListener("click", function () {
    navBar.classList.toggle("hide");
    menu.classList.toggle("shift")
  });
  
  //FUNCTION THAT GETS AND DISPLAYS DASHBOARD INFORMATION
  
  function dashboardInfo() {
    const pageModal = document.getElementById("pageModal");
    pageModal.style.display = "flex";
  
    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
    const token = tokenAcquired.token;
  
    const dashboardInfoHeader = new Headers();
  
    dashboardInfoHeader.append("Authorization", `Bearer ${token}`);
  
    const dashboardReq = {
      method: "GET",
      headers: dashboardInfoHeader,
    };
  
    const URL =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
  
    fetch(URL, dashboardReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // get the neccesary elements to display information in
        const getCategory = document.getElementById("category");
        const getLearningMaterials = document.getElementById("learningMaterials");
        const getSubCategory = document.getElementById("subCategories");
        const getTotalQuiz = document.getElementById("totalQuiz");
        const getTotalStudents = document.getElementById("totalStudents");
        const getAdminName = document.getElementById("adminUserName");
  
        //use the information gotten from the result/response object
        getCategory.innerHTML = `${result.total_number_of_categories}`;
        getLearningMaterials.innerHTML = `${result.total_number_of_learningmaterial}`;
        getSubCategory.innerHTML = `${result.total_number_of_subcategories}`;
        getTotalQuiz.innerHTML = `${result.total_number_of_quize}`;
        getTotalStudents.innerHTML = `${result.total_number_of_students}`;
        getAdminName.innerHTML = `${result.admin_name
          .charAt(0)
          .toUpperCase()}${result.admin_name.slice(1)}`;
  
        pageModal.style.display = "none";
      })
      .catch((error) => console.log("error", error));
  }
  
  dashboardInfo();
  
  //FUNCTION THAT TO SHOW STUDENT MODAL
  
  const topThreeStudent = document.getElementById("topThreeStudent");
  
  topThreeStudent.addEventListener("click", (event) => {
    event.preventDefault();
    const studentModal = document.getElementById("studentModal");
    studentModal.style.display = "block";
  
    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
    const token = tokenAcquired.token;
  
    const topThree = new Headers();
    topThree.append("Authorization", `Bearer ${token}`);
  
    const topThreeReq = {
      method: "GET",
      headers: topThree,
    };
  
    const URL =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
  
    let resultData = [];
  
    fetch(URL, topThreeReq)
      .then((response) => response.json())
      .then((result) => {
        const getBestStudents = document.getElementById("topThreeScores");
  
        if (result.length === 0) {
          getBestStudents.innerHTML = "No Information Found";
        } else {
          result.map((item) => {
            resultData += `
            <div class="search-card">
                      <div class="card">
                          <p>Name:</p>
                          <p>${item.name}</p>
                      </div>
                      <div class="card">
                          <p>Email:</p>
                          <p>${item.email}</p>
                      </div>
                      <div class="card">
                          <p>Phone:</p>
                          <p>${item.phone_number}</p>
                      </div>
                      <div class="card">
                          <p>Position:</p>
                          <p>${item.position}</p>
                      </div>
                      <div class="card">
                          <p>Score:</p>
                          <p>${item.total_score}</p>
                      </div>
                  </div>
            `;
          });
          getBestStudents.innerHTML = resultData;
          getBestStudents.classList.add("show");
        }
      })
      .catch((error) => console.log("error", error));
  });
  
  // FUNCTION TO CLOSE STUDENT MODAL
  
  function closeStudentModal() {
    const studentModal = document.getElementById("studentModal");
    studentModal.style.display = "none";
  }
  
  // FUNCTION TO GET ALL STUDENTS ON THE TABLE
  
  function getAllStudents() {
    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
    const token = tokenAcquired.token;
  
    const getAllStudents = new Headers();
    getAllStudents.append("Authorization", `Bearer ${token}`);
  
    const allStudentsreq = {
      method: "GET",
      headers: getAllStudents,
    };
  
    let allStudents = [];
  
    const URL =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";
  
    fetch(URL, allStudentsreq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const allStudentsTable = document.getElementById("allStudents");
  
        if (result.length === 0) {
          allStudentsTable.innerHTML = "No Registered Student!";
        } else {
          result.map((item) => {
            allStudents += `
            <tr>
              <td>${item.name}</td>
              <td>${item.email}</td>
              <td>${item.phone_number}</td>
              <td>${item.position}</td>
              <td>${item.total_score}</td>
            </tr>
            `;
          });
        }
        allStudentsTable.innerHTML = allStudents;
      })
      .catch((error) => console.log("error", error));
  }
  
  getAllStudents();
  
  //FUNCTION TO LOGOUT OF THE ADMIN APP
  function logout() {
    localStorage.removeItem("adminObj");
    Swal.fire({
      icon: "info",
      text: "Logging Out!",
      confirmButtonColor: "#2D85DE",
    });
    setTimeout(() => {
      location.href = "index.html";
    }, 4000);
  }