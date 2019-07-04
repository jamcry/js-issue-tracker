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
  issueForm.querySelector('#issue-desc').focus();
  fetchIssues();
}

function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issues-list');
  issuesList.innerHTML = '';

  [...issues].forEach((issue) => {
    const newIssue = issueElement(issue);
    issuesList.innerHTML += newIssue;
  })
}

function closeIssue(id) {
  event.target.disabled = true;
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

function getPriorityClass(priority) {
  let classList = 'badge ';
  if (priority === 'High') classList += 'badge-success';
  else if (priority === 'Medium') classList += 'badge-warning';
  else if (priority === 'Low') classList += 'badge-secondary';
  return classList;
}

function getStatusClass(status) {
  let classList = 'badge ';
  if (status === 'Open') classList += 'badge-info';
  else if (status === 'Closed') classList += 'badge-secondary';
  return classList;
}

const issueElement = (issue) => {
  const { id, desc, priority, worker, status } = issue;
  return `
  <div class="rounded p-3 border bg-light mb-2">
    <h6>Issue ID: ${id}</h6>
    <h5 class="${getStatusClass(status)}">${status}</h5>
    <p class="${getPriorityClass(priority)}"><i class="fas fa-clock"></i> ${priority} Priority</p>
    <h3>${desc}</h3>
    <p><i class="fas fa-address-card"></i> ${worker}</p>
    <a href="#" onclick="closeIssue('${id}')" class="btn btn-warning">Close</a>
    <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
  </div>`

}