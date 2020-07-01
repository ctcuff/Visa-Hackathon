import '../styles/about.css';
import React, { Component } from 'react';
//import Image from 'react-bootstrap/Image';
import ellynImage from '../assets/ellyn.jpg';
import jeffreyImage from '../assets/jeffrey.jpeg';
import alecImage from '../assets/alec.png';
import cameronImage from '../assets/cameron.jpg';
import nicolasImage from '../assets/nicolas.jpeg'


export default class TeamPage extends Component {
  render() {
    return (

      <div class="container">
        <div class="text-center">
          <h1 className="about-heading">Our Team</h1>
        </div>
          <div class="row text-center">

              <div class="col-xl-3 col-sm-6 mb-5">
                  <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img src="https://images.squarespace-cdn.com/content/v1/55fc0004e4b069a519961e2d/1442590746571-RPGKIXWGOO671REUNMCB/ke17ZwdGBToddI8pDm48kKVo6eXXpUnmuNsFtLxYNDVZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7abfyk2s94xLLkDA7TSo2rckMlGDU48FfF-V7lLcSuGNU_Uf7d6wOiJwP-LWX64gbQ/image-asset.gif"
                  alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                      <h5 class="mb-0">Monica Boomgaarden</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                      <ul class="social mb-0 list-inline mt-3">
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                      </ul>
                  </div>
              </div>


              <div class="col-xl-3 col-sm-6 mb-5">
                  <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img src={alecImage}
                  alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                      <h5 class="mb-0">Alec Chen</h5><span class="small text-uppercase text-muted">University of California Irvine - Computer Science</span>
                      <ul class="social mb-0 list-inline mt-3">
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                      </ul>
                  </div>
              </div>


              <div class="col-xl-3 col-sm-6 mb-5">
                  <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img src={cameronImage}
                  alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                      <h5 class="mb-0">Cameron Cuff</h5><span class="small text-uppercase text-muted">University of Central Florida - Computer Science</span>
                      <ul class="social mb-0 list-inline mt-3">
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                      </ul>
                  </div>
              </div>


              <div class="col-xl-3 col-sm-6 mb-5">
                  <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img src={jeffreyImage}
                  alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                      <h5 class="mb-0">Jeffrey Huang</h5><span class="small text-uppercase text-muted">University of Chicago - Computer Science and Math</span>
                      <ul class="social mb-0 list-inline mt-3">
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                      </ul>
                  </div>
              </div>
          </div>

          <div class="row text-center">

              <div class="col-xl-3 col-sm-6 mb-5">
                  <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img src={ellynImage}
                  alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                      <h5 class="mb-0">Ellyn Liu</h5><span class="small text-uppercase text-muted">University of Chicago - Computer Science and Music</span>
                      <ul class="social mb-0 list-inline mt-3">
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                      </ul>
                  </div>
              </div>


              <div class="col-xl-3 col-sm-6 mb-5">
                  <div class="bg-white rounded shadow-sm py-5 px-4">
                  <img src={nicolasImage}
                  alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                      <h5 class="mb-0">Nicolas Molano</h5><span class="small text-uppercase text-muted">University of Florida - Computer Engineering</span>
                      <ul class="social mb-0 list-inline mt-3">
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                      </ul>
                  </div>
              </div>


              <div class="col-xl-3 col-sm-6 mb-5">
                  <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://images.squarespace-cdn.com/content/v1/55fc0004e4b069a519961e2d/1442590746571-RPGKIXWGOO671REUNMCB/ke17ZwdGBToddI8pDm48kKVo6eXXpUnmuNsFtLxYNDVZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7abfyk2s94xLLkDA7TSo2rckMlGDU48FfF-V7lLcSuGNU_Uf7d6wOiJwP-LWX64gbQ/image-asset.gif"
                  alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                      <h5 class="mb-0">Andre Ruiz</h5><span class="small text-uppercase text-muted">Mentor</span>
                      <ul class="social mb-0 list-inline mt-3">
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
                          <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
                      </ul>
                  </div>
              </div>
            </div>
      </div>
    )
  }
}
