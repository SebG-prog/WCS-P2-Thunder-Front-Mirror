import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'

class ScrollToTop extends Component {
    state = {
      is_visible: false /* set the visibility of the button */
    };
  
    componentDidMount() {
      /* this referes to the scroll component*/ ;
    document.addEventListener("scroll", event =>  this.toggleVisibility())
    }

    /* check if the scroll position and if the page is scrolled to 300px then the state is changed to true */
    toggleVisibility() {
      (window.pageYOffset > 300) ?  this.setState({ is_visible: true}) : this.setState({ is_visible: false});
    }

    /* Scroll to the top smoothly */
    scrollToTop() {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

    render() {
      return (
        <div className="scroll-to-top">
          
              <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={() => this.scrollToTop()} />
              {/* {this.state.is_visible && ()} */}
        </div>
      );
    };
}

export default ScrollToTop;