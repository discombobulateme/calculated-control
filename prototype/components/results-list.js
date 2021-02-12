const renderResult = ({ data }) => {
  return `
    <li>
      <h2>${data.title}</h2>
      <p>${data.abstractNote}</p>
    </li>
  `;
};

export default (items) => {
  const list = document.getElementById('results');
  list.innerHTML = items.map(renderResult).join('\n');
}
