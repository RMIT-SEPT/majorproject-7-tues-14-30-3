import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="page-footer blue darken-4" data-test="footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <a className="white-text" href="">
                <h6>
                  <i className="material-icons">collections_bookmark</i>Agme
                  Booking
                </h6>
              </a>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  About
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Help
                </a>
              </li>

              <a className="grey-text text-lighten-3" href="#!">
                Legal
              </a>
            </div>
            <div className="col l4 offset-l2 s12" data-test="social-links">
              <h6 className="white-text">Social links</h6>
              <ul>
                <li>
                  <a
                    className="grey-text text-lighten-3"
                    href="#!"
                    data-test="facebook-link"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    className="grey-text text-lighten-3"
                    href="#!"
                    data-test="twitter-link"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    className="grey-text text-lighten-3"
                    href="#!"
                    data-test="linkedIn-link"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    className="grey-text text-lighten-3"
                    href="#!"
                    data-test="instagram-link"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2020 Agme Booking
            <a className="grey-text text-lighten-4 right">Australia</a>
          </div>
        </div>
      </div>
    );
  }
}
