// Define the student array
const students = [
    {
        ID:'ID',
        name:'Student Name',
        age: 'Age',
        grade:' GPA',
        degree:' Degree',
        email:'Email'
    },

    {
      ID: 1,
      name: 'Alice',
      age: 21,
      grade: 'A',
      degree: 'Btech',
      email: 'alice@example.com'
    },
    {
      ID: 2,
      name: 'Bob',
      age: 22,
      grade: 'B',
      degree: 'MBA',
      email: 'bob@example.com'
    },
    {
      ID: 3,
      name: 'Charlie',
      age: 20,
      grade: 'C',
      degree: 'Arts',
      email: 'charlie@example.com'
    }
  ];
  
  const studentListContainer = document.getElementById('student-list');
  const studentForm = document.getElementById('student-form');
  const addBtn = document.getElementById('add-btn');
  const searchInput = document.getElementById('search');
  
  let isEditMode = false;
  let editStudentId = null;
  
  // Function to render the student list
  function renderStudentList() {
    studentListContainer.innerHTML = '';
  
    for (const student of students) {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <span class="edit-btn" data-id="${student.ID}">&#9998;</span>
          <span class="delete-btn" data-id="${student.ID}">&#10060;</span>
        </td>
      `;
  
      studentListContainer.appendChild(row);
    }
  
    addEditDeleteEventListeners();
  }
  
  // Function to add event listeners to the edit and delete buttons
  function addEditDeleteEventListeners() {
    const editButtons = document.getElementsByClassName('edit-btn');
    const deleteButtons = document.getElementsByClassName('delete-btn');
  
    for (const button of editButtons) {
      button.addEventListener('click', handleEdit);
    }
  
    for (const button of deleteButtons) {
      button.addEventListener('click', handleDelete);
    }
  }
  
  // Function to handle the form submission
  function handleSubmit(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const gradeInput = document.getElementById('grade');
    const degreeInput = document.getElementById('degree');
    const emailInput = document.getElementById('email');
  
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);
    const grade = gradeInput.value.trim();
    const degree = degreeInput.value.trim();
    const email = emailInput.value.trim();
  
    if (name && age && grade && degree && email) {
      if (isEditMode) {
        // Update existing student
        const student = students.find(student => student.ID === editStudentId);
        if (student) {
          student.name = name;
          student.age = age;
          student.grade = grade;
          student.degree = degree;
          student.email = email;
        }
      } else {
        // Add new student
        const ID = students.length > 0 ? students[students.length - 1].ID + 1 : 1;
        students.push({ ID, name, age, grade, degree, email });
      }
  
      // Reset the form
      studentForm.reset();
      addBtn.textContent = 'Add Student';
      isEditMode = false;
      editStudentId = null;
  
      renderStudentList();
    }
  }
  
  // Function to handle the edit button click
  function handleEdit(event) {
    const studentId = parseInt(event.target.dataset.id);
    const student = students.find(student => student.ID === studentId);
  
    if (student) {
      const nameInput = document.getElementById('name');
      const ageInput = document.getElementById('age');
      const gradeInput = document.getElementById('grade');
      const degreeInput = document.getElementById('degree');
      const emailInput = document.getElementById('email');
  
      nameInput.value = student.name;
      ageInput.value = student.age;
      gradeInput.value = student.grade;
      degreeInput.value = student.degree;
      emailInput.value = student.email;
  
      addBtn.textContent = 'Edit Student';
      isEditMode = true;
      editStudentId = studentId;
    }
  }
  
  // Function to handle the delete button click
  function handleDelete(event) {
    const studentId = parseInt(event.target.dataset.id);
    const studentIndex = students.findIndex(student => student.ID === studentId);
  
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      renderStudentList();
    }
  }
  
  // Function to handle the search input
  function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredStudents = students.filter(
      student =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.degree.toLowerCase().includes(searchTerm)
    );
  
    studentListContainer.innerHTML = '';
  
    if (filteredStudents.length > 0) {
      for (const student of filteredStudents) {
        const row = document.createElement('tr');
  
        row.innerHTML = `
          <td>${student.ID}</td>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.grade}</td>
          <td>${student.degree}</td>
          <td>${student.email}</td>
          <td>
            <span class="edit-btn" data-id="${student.ID}">&#9998;</span>
            <span class="delete-btn" data-id="${student.ID}">&#10060;</span>
          </td>
        `;
  
        studentListContainer.appendChild(row);
      }
  
      addEditDeleteEventListeners();
    } else {
      studentListContainer.innerHTML = '<tr><td colspan="7">No matching students found.</td></tr>';
    }
  }
  
  // Add event listeners
  studentForm.addEventListener('submit', handleSubmit);
  searchInput.addEventListener('input', handleSearch);
  
  // Initial rendering of the student list
  renderStudentList();
  