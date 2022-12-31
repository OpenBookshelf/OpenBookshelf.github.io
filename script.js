const slideData = [
{
  index: 0,
  button: 'Visit',
  link: "https://openbookshelf.github.io/DiscreteMathematics-Persian/",
  src: 'https://github.com/OpenBookshelf/DiscreteMathematics-Persian/raw/master/Docs/Preview.png' },

{
  index: 1,
  button: 'Visit',
  link: "https://openbookshelf.github.io/ProbStat/",
  src: 'https://github.com/OpenBookshelf/ProbStat/blob/gh-pages/static/media/logo.1a4de5c9473e6d3b6b60.png?raw=true' },

];




// =========================
// Slide
// =========================

class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.slide = React.createRef();
  }

  handleMouseMove(event) {
    const el = this.slide.current;
    const r = el.getBoundingClientRect();

    el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
    el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)));
  }

  handleMouseLeave(event) {
    this.slide.current.style.setProperty('--x', 0);
    this.slide.current.style.setProperty('--y', 0);
  }

  handleSlideClick(event) {
    this.props.handleSlideClick(this.props.slide.index);
  }

  imageLoaded(event) {
    event.target.style.opacity = 1;
  }

  render() {
    const { src, button, link, index } = this.props.slide;
    const current = this.props.current;
    let posClass = '';

    if (current === index) posClass += '--current';else
    if (current - 1 === index) posClass += '--previous';else
    if (current + 1 === index) posClass += '--next';

    return /*#__PURE__*/(
      React.createElement("div", { className: "slide__cover center" },
        React.createElement("li", {
          ref: this.slide,
          className: 'slide slide'+posClass,
          onClick: this.handleSlideClick,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave }, /*#__PURE__*/

          React.createElement("div", { className: "slide__image-wrapper" }, /*#__PURE__*/
            React.createElement("img", {
              className: "slide__image",
              src: src,
              onLoad: this.imageLoaded }))), /*#__PURE__*/

        // React.createElement("article", { className: "slide__content" }, /*#__PURE__*/
        React.createElement("a", { className: "slide__button slide__button"+posClass, href: link },
          React.createElement("button", { className: "slide__action btn slide__action"+posClass }, button))));



  }}



// =========================
// Slider control
// =========================

const SliderControl = ({ type, title, handleClick }) => {
  return /*#__PURE__*/(
    React.createElement("button", { className: `btn btn--${type}`, title: title, onClick: handleClick }, /*#__PURE__*/
    React.createElement("svg", { className: "icon", viewBox: "0 0 24 24" }, /*#__PURE__*/
    React.createElement("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" }))));



};


// =========================
// Slider
// =========================

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: 0 };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
  }

  handlePreviousClick() {
    const previous = this.state.current - 1;

    this.setState({
      current: previous < 0 ?
      this.props.slides.length - 1 :
      previous });

  }

  handleNextClick() {
    const next = this.state.current + 1;

    this.setState({
      current: next === this.props.slides.length ?
      0 :
      next });

  }

  handleSlideClick(index) {
    if (this.state.current !== index) {
      this.setState({
        current: index });

    }
  }

  render() {
    const { current, direction } = this.state;
    const { slides, heading } = this.props;
    const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`;
    const wrapperTransform = {
      'transform': `translateX(-${current * (100 / slides.length)}%)` };


    return /*#__PURE__*/(
      React.createElement("div", { className: "slider", "aria-labelledby": headingId }, /*#__PURE__*/
      React.createElement("ul", { className: "slider__wrapper", style: wrapperTransform }, /*#__PURE__*/
      React.createElement("h3", { id: headingId, class: "visuallyhidden" }, heading),

      slides.map(slide => {
        return /*#__PURE__*/(
          React.createElement(Slide, {
            key: slide.index,
            slide: slide,
            current: current,
            handleSlideClick: this.handleSlideClick }));


      })), /*#__PURE__*/


      React.createElement("div", { className: "slider__controls" }, /*#__PURE__*/
      React.createElement(SliderControl, {
        type: "previous",
        title: "Go to previous slide",
        handleClick: this.handlePreviousClick }), /*#__PURE__*/


      React.createElement(SliderControl, {
        type: "next",
        title: "Go to next slide",
        handleClick: this.handleNextClick }))));




  }}



ReactDOM.render( /*#__PURE__*/React.createElement(Slider, { heading: "Example Slider", slides: slideData }), document.getElementById('app'));