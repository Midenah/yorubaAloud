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
    menu.classList.toggle("shift");
  });
    const getName = document.getElementById("adminUserName")
  
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
        getAdminName.innerHTML = `${result.admin_name}`
  
        pageModal.style.display = "none";
      })
      .catch((error) => console.log("error", error));
  }
  
  dashboardInfo();
  
  //FUNCTION THAT SHOWS TOP 3 STUDENT MODAL
  
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
        console.log(result);
  
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
  
  // FUNCTION TO CLOSE TOP 3 STUDENT MODAL
  
  function closeStudentModal() {
    const studentModal = document.getElementById("studentModal");
    studentModal.style.display = "none";
  }
  
  //FUNCTION TO CREATE CATEGORIES
  
  function createCategories(event) {
    event.preventDefault();
  
    const categoryName = document.getElementById("categoryName").value;
    const categoryImage = document.getElementById("categoryImage").files[0];
    const createCategoryBtn = document.getElementById("createCategoryBtn");
  
    createCategoryBtn.classList.add("pulse");
    createCategoryBtn.innerText = "Sending";
  
    if (categoryImage === "" || categoryName === "") {
      Swal.fire({
        icon: "info",
        text: "All fields are required!",
        confirmButtonColor: "#2D85DE",
      });
      pageModal.style.display = "none";
      createCategoryBtn.classList.remove("pulse");
      createCategoryBtn.innerText = "Create Category";
    } else {
      const authToken = localStorage.getItem("adminObj");
      const tokenAcquired = JSON.parse(authToken);
      const token = tokenAcquired.token;
  
      const category = new Headers();
      category.append("Authorization", `Bearer ${token}`);
  
      const createCategories = new FormData();
      createCategories.append("name", categoryName);
      createCategories.append("image", categoryImage);
  
      const categoryRequest = {
        method: "POST",
        headers: category,
        body: createCategories,
      };
  
      const URL =
        "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";
  
      fetch(URL, categoryRequest)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "success") {
            swal.fire({
              icon: "success",
              text: "Category succesfully created",
              confirmButtonColor: "#2D85DE",
            });
  
            setTimeout(() => {
              location.href = "category.html";
            }, 5000);
            createCategoryBtn.classList.remove("pulse");
            createCategoryBtn.innerText = "Create Category";
          } else {
            Swal.fire({
              icon: "error",
              text: "Category not created!",
              confirmButtonColor: "#2D85DE",
            });
            createCategoryBtn.classList.remove("pulse");
            createCategoryBtn.innerText = "Create Category";
          }
        })
        .catch((error) => console.log("error", error));
    }
  }
  
  //FUNCTION TO DISPLAY CREATED CATEGORY
  
  function displayCategory() {
    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
    const token = tokenAcquired.token;
  
    const category = new Headers();
    category.append("Authorization", `Bearer ${token}`);
  
    const displayCatRequest = {
      method: "GET",
      headers: category,
    };
  
    let categoryDisplay = [];
  
    const URL =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";
  
    fetch(URL, displayCatRequest)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const categoriesContainer = document.getElementById("categories");
        result.map((item) => {
          categoryDisplay += `
          <div class="student-card">
              <div class="cat-img">
              <a href="details.html?id=${item.id}&name=${item.name}">  <img src="${item.image}"></a>
              </div>
              <div class="name__btns">
              <p>${item.name}</p>
              <div class="buttons">
                  <button class="update-button" onclick=" openUpdateCategory(${item.id})">Update</button>
                  <button class="delete-button" id="deleteBtn" onclick="deleteCategory(${item.id})">Delete</button>
              </div>
              </div>
          </div> 
          `;
        });
        categoriesContainer.innerHTML = categoryDisplay;
      })
      .catch((error) => console.log("error", error));
  }
  
  displayCategory();
  
  //FUNCTION TO CREATE/OPEN UPDATE CATEGORY MODAL
  
  let uniqueCategoryId;
  
  function openUpdateCategory(categoryId) {
    localStorage.setItem("id", categoryId);
  
    const modalContainer = document.getElementById("modalContainer");
    modalContainer.style.display = "block";
  
    const updateCategoryText = document.getElementById("updateCategoryText");
    const updateCategoryFile = document.getElementById("updateCategoryFile");
  
    updateCategoryText.style.display = "block";
    updateCategoryFile.style.display = "none";
  
    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
    const token = tokenAcquired.token;
  
    const updateCategoryHeader = new Headers();
    updateCategoryHeader.append("Authorization", `Bearer ${token}`);
  
    uniqueCategoryId = categoryId;
  
    const updateCategoryRequest = {
      method: "GET",
      headers: updateCategoryHeader,
    };
  
    const URL = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${uniqueCategoryId}`;
  
    fetch(URL, updateCategoryRequest)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
  
        const updateCategoryName = document.getElementById("updateCategoryName");
        const updateCategoryImage = document.getElementById(
          "updateCategoryImage"
        );
  
        updateCategoryImage.setAttribute("value", `${result.image}`);
        updateCategoryName.setAttribute("value", `${result.name}`);
      })
      .catch((error) => console.log("error", error));
  }
  
  //FUNCTION TO CLOSE THE MODAL ABOVE
  
  const closeUpdateCategoryModal = document.getElementById(
    "closeUpdateCategoryModal"
  );
  
  closeUpdateCategoryModal.addEventListener("click", () => {
    const modalContainer = document.getElementById("modalContainer");
    modalContainer.style.display = "none";
  });
  
  //FUNCTION TO CHANGE UPDATE CATEGORY IMAGE
  
  function changeImg(event) {
    event.preventDefault();
    const updateCategoryText = document.getElementById("updateCategoryText");
    const updateCategoryFile = document.getElementById("updateCategoryFile");
  
    updateCategoryText.style.display = "none";
    updateCategoryFile.style.display = "block";
  }
  
  //FUNCTION THAT UPDATES CATEGORY WHEN THE UPDATE CATEGORY BUTTON OF THE IMAGE ABOVE IS CLICKED
  function updateCategory(event) {
    event.preventDefault();
  
    const updateCategoryBtn = document.getElementById("updateCategoryBtn");
    updateCategoryBtn.innerText = "Updating...";
  
    const updateCategoryName =
      document.getElementById("updateCategoryName").value;
    const updateCategoryImage = document.getElementById("updateCategoryImage");
    const updateCategoryFiles = document.getElementById("updateCategoryFiles")
      .files[0];
    const storedId = localStorage.getItem("id");
  
    if (updateCategoryImage === "") {
      Swal.fire({
        icon: "info",
        text: "The name field is required!",
        confirmButtonColor: "#2D85DE",
      });
    } else {
      const authToken = localStorage.getItem("adminObj");
      const tokenAcquired = JSON.parse(authToken);
      const token = tokenAcquired.token;
  
      const updateCategoryHeaders = new Headers();
      updateCategoryHeaders.append("Authorization", `Bearer ${token}`);
  
      const updateCategoryData = new FormData();
      updateCategoryData.append("name", updateCategoryName);
      updateCategoryData.append("image", updateCategoryImage);
      updateCategoryData.append("image", updateCategoryFiles);
      updateCategoryData.append("category_id", storedId);
  
      const updateCategoryRequest = {
        method: "POST",
        headers: updateCategoryHeaders,
        body: updateCategoryData,
      };
  
      const URL =
        "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";
  
      fetch(URL, updateCategoryRequest)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === "success") {
            Swal.fire({
              icon: "success",
              text: `${result.message}`,
              confirmButtonColor: "#2D85DE",
            });
            setTimeout(() => {
              location.reload();
            }, 3000);
          } else {
            Swal.fire({
              icon: "info",
              text: "Unsuccessful!",
              confirmButtonColor: "#2D85DE",
            });
            updateCategoryBtn.innerText = "Update Category";
          }
        })
        .catch((error) => console.log("error", error));
    }
  }
  
  //FUNCTION TO DELETE CATEGORY
  
  function deleteCategory(deleteCategoryId) {
    const authToken = localStorage.getItem("adminObj");
    const tokenAcquired = JSON.parse(authToken);
    const token = tokenAcquired.token;
  
    const deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.innerText = "Deleting...";
  
    const deleteCategoryHeaders = new Headers();
    deleteCategoryHeaders.append("Authorization", `Bearer ${token}`);
  
    const deleteCategoryRequest = {
      method: "GET",
      headers: deleteCategoryHeaders,
    };
  
    const URL = `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_category/${deleteCategoryId}`;
  
    fetch(URL, deleteCategoryRequest)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
          deleteBtn.innerText = "Delete";
  
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: "Unsuccessful",
            confirmButtonColor: "#2D85DE",
          });
          deleteBtn.innerText = "Delete";
        }
      })
      .catch((error) => console.log("error", error));
  }
  
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