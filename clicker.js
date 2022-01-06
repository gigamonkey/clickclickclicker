// This file contains a basic framework for a clicker game. For it to
// work you need to define three functions: `setup`, `click`, and
// `update`.

// The `setup` function will be called once when the page is loaded
// and is a good place to make any one-time manipulation of document
// need to get ready to play and to set up any event handlers you
// need.

// The `click` function will be called every time the user clicks the
// mouse.

// And `update` will be called regularly with its argument telling you
// how many seconds it has been since the last call. Note that the
// value will likely be a small fraction of a second like 0.016
// seconds.

// It is probably worthwhile to read through this code to see how it
// is wired together. The comments should explain pretty much
// everything. You probably won't need to change anything in this file
// to enhance your game. And don't worry if there are bits of code you
// don't understand--I wrote this so you wouldn't have to as some of
// it is a bit advanced for just now.

// This is the function that kicks everything off. Look just below the
// definition of this function to see how we register it to handle an
// event the browser fires as the document is loaded. It will be called
// several times as the document goes through various steps of being
// set up by the browser but the last time it is called, the readyState
// property will be 'complete' so we wait until then to do anything.
function start(event) {
  if (event.target.readyState === 'complete') {
    // This gets the very root of the document tree, corresponding to
    // the <html> element in index.html.
    let doc = document.documentElement;

    // Set up the basic click handler on the whole document so the
    // user can click anywhere. The handler calls the game's `click`
    // function. We don't pass the event because all we care is that
    // there was a click. You can also set up specific click handlers
    // on other elements to, for instance, implement things you can
    // buy. But this handles the generic clicking.
    doc.addEventListener("click", e => click());

    // A nuance to prevent all the clicking from doing normal things
    // like selecting text in the page.
    doc.addEventListener('mousedown', e => e.preventDefault());

    // Call the game's `setup` function once.
    setup();

    // Start the animation loop. See below for details.
    animate();
  }
}
// Arrange to have `start` called as the HTML document is loaded by the
// browser. 
document.addEventListener('readystatechange', start);


// The animation loop. This uses the browser's built in
// requestAnimationFrame function to update things as fast as possible
// (likely 60 times a second). That may be excessive but it lets us
// see the numbers really fly! A call to requestAnimationFrame takes a
// function as an argument and that function will be called when it is
// time to draw a new frame, getting passed a timestamp of when it is
// being called.
function animate() {

  // For now give us a way to stop the animation loop since sometimes
  // replit gets sad when a page is doing a lot of work.
  let stopped = false;

  // Attach an event handler to the stop button that just sets the
  // stopped variable to true. The "e => { stopped = true}" is a
  // special syntax for functions.
  document.getElementById("stop").onclick = e => { stopped = true; };

  // This grabs the current value of the clock
  let previous = performance.now();

  // This is a bit of a funny function that is designed to be passed
  // to requestAnimationFrame (and thus be run for each animation
  // frame). It calls out to the game's `update` functions where we'll
  // do the real work and then arranges to be called again for the
  // next frame, thus establishing the animation loop. We define it
  // here, within the `animate` function so it has access to the
  // variables `stopped` and `previous`. (This is a bit of somewhat
  // deep magic but just know that the values of those variables stick
  // around between calls to `step`, even though `animate` will have
  // completed before `step` is ever called.)
  function step(timestamp) {

    // We use the timestamp of when we are called to compute how long
    // it has been since the last time we were called so we can pass
    // that value to the `update` function.
    if (!stopped && update(timestamp - previous)) {
      // Immediately request to be called again for the next frame. It
      // may seem a bit odd that we can reference `step` while we're
      // still defining it but it actually works fine.
      requestAnimationFrame(step);
    }

    // Update previous so the next call to step will compute the
    // correct elapsed time.
    previous = timestamp;
  }

  // Start the the animation loop.
  requestAnimationFrame(step);
}
