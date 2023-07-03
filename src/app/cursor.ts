import { gsap } from "gsap";

function reset(cursorOuter, cursorOuterOriginalState)
{
  gsap.to(cursorOuter, 0.2, {
    width: cursorOuterOriginalState.width,
    height: cursorOuterOriginalState.width,
    borderRadius: "50%",
    backgroundColor: "transparent",
  });
}

export const request: any = {};

export function init(number)
{
    const cursorOuter = document.querySelector(".cursor--large");
    const cursorInner = document.querySelector(".cursor--small");

    let isStuck = false;
    let mouse = {
      x: -100,
      y: -100,
    };

    // Just in case you need to scroll
    let scrollHeight = 0;
    window.addEventListener('scroll', function(e) {
      scrollHeight = window.scrollY
    })

    let cursorOuterOriginalState = {
      width: 40,
      height: 40,
    };

    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
      button.addEventListener("pointerenter", handleMouseEnter);
      button.addEventListener("pointerleave", handleMouseLeave);
    });

    document.body.addEventListener("pointermove", updateCursorPosition);
    document.body.addEventListener("pointerdown", () => {
      gsap.to(cursorInner, 0.15, {
        scale: 2,
      });
    });

    document.body.addEventListener("pointerup", () => {
      gsap.to(cursorInner, 0.15, {
        scale: 1,
      });
    });

    function updateCursorPosition(e) {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    }

    function updateCursor() {
      gsap.set(cursorInner, {
        x: mouse.x,
        y: mouse.y,
      });

      if (!isStuck) {
        gsap.to(cursorOuter, {
          duration: 0.15,
          x: mouse.x - cursorOuterOriginalState.width/2,
          y: mouse.y - cursorOuterOriginalState.height/2,
        });
      }

      request.value = requestAnimationFrame(updateCursor);
    }

    updateCursor();

    function handleMouseEnter(e)
    {
      isStuck = true;
      const targetBox = e.currentTarget.getBoundingClientRect();

      gsap.to(cursorOuter, 0.2, {
        x: targetBox.left, 
        y: targetBox.top + scrollHeight,
        width: targetBox.width,
        height: targetBox.height,
        borderRadius: 0,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      });
    }

    function handleMouseLeave(e) {
      isStuck = false;

      gsap.to(cursorOuter, 0.2, {
        width: cursorOuterOriginalState.width,
        height: cursorOuterOriginalState.width,
        borderRadius: "50%",
        backgroundColor: "transparent",
      });
    }

    if(number > 1){
      reset(cursorOuter, cursorOuterOriginalState);
    } 
}