"use strict"
const issueForm = document.getElementById('issue-form');
issueForm.addEventListener('submit', createIssue);

function createIssue(event) {
  event.preventDefault();
  const id = chance.guid();
  const desc = document.getElementById('issue-desc').value;
  const priority = document.getElementById('issue-priority').value;
  const worker = document.getElementById('issue-worker').value;
  const status = 'Open';
  const newIssue = { id, desc, priority, worker, status };
  // Initialize localStorage if empty
  if (localStorage.getItem('issues') === null) {
    const issues = [newIssue];
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const updatedIssues = [...issues, newIssue];
    console.log(updatedIssues);
    localStorage.setItem('issues', JSON.stringify(updatedIssues));
  }
  issueForm.reset();
  fetchIssues();
}

function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issues-list');
  issuesList.innerHTML = '';

  if (issues) {
    [...issues].forEach((issue) => {
      const newIssue = issueElement(issue);
      issuesList.innerHTML += newIssue;
    })
  }
}

function closeIssue(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));

  const updatedIssues = issues.map(issue => {
    if (issue.id === id) issue.status = 'Closed';
    return issue;
  })

  localStorage.setItem('issues', JSON.stringify(updatedIssues));
  fetchIssues();
}

function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));

  const updatedIssues = issues.filter(issue => issue.id !== id);
  localStorage.setItem('issues', JSON.stringify(updatedIssues));
  fetchIssues();
}

const issueElement = (issue) => {
  const { id, desc, priority, worker, status } = issue;

  return `
  <div class="rounded p-3 border bg-light">
    <h6>Issue ID: ${id}</h6>
    <h5 class="badge badge-info">${status}</h5>
    <h3>${desc}</h3>
    <p><i class="fas fa-clock"></i> ${priority}</p>
    <p><i class="fas fa-address-card"></i> ${worker}</p>
    <a href="#" onclick="closeIssue('${id}')" class="btn btn-warning">Close</a>
    <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
  </div>`

}