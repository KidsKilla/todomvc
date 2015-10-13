var context = require.context('../js', true, /\.jsx?$/);
context.keys().filter(p=>!/start.jsx?$/.test(p)).forEach(context);
