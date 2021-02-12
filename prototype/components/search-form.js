export default ({ onSubmit = () => {} }) => {
  const form = document.getElementById('search-form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const tag = data.getAll('tag');
    const q = data.get('q');
    onSubmit({ q, tag });
  });
};
