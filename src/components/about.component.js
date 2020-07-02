import '../styles/about.css';
import React, { Component } from 'react';
//import Image from 'react-bootstrap/Image';
import ellynImage from '../assets/ellyn.jpg';
import jeffreyImage from '../assets/jeffrey.jpeg';
import alecImage from '../assets/alec.png';
import cameronImage from '../assets/cameron.jpg';
import nicolasImage from '../assets/nicolas.jpeg';
import monicaImage from '../assets/monica.jpg';
import andreImage from '../assets/andre.jpeg';

export default class TeamPage extends Component {
  render() {
    return (

      <div className="container">
        <div className="about-text-center">
          <h1 className="about-heading">Our Team</h1>
        </div>
          <div className="row about-text-center">

              <div className="col-xl-3 col-sm-6 mb-5">
                  <div className="bg-white rounded shadow-sm py-5 px-4">
                  <img src={monicaImage}
                  alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                      <h5 className="mb-0">Monica Boomgaarden</h5><span className="small text-muted">University of Colorado Boulder - Applied Computer Science</span>
                  </div>
              </div>


              <div className="col-xl-3 col-sm-6 mb-5">
                  <div className="bg-white rounded shadow-sm py-5 px-4">
                  <img src={alecImage}
                  alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                      <h5 className="mb-0">Alec Chen</h5><span className="small text-muted">University of California Irvine - Computer Science</span>
                  </div>
              </div>


              <div className="col-xl-3 col-sm-6 mb-5">
                  <div className="bg-white rounded shadow-sm py-5 px-4">
                  <img src={cameronImage}
                  alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                      <h5 className="mb-0">Cameron Cuff</h5><span className="small text-muted">University of Central Florida - Computer Science</span>
                  </div>
              </div>


              <div className="col-xl-3 col-sm-6 mb-5">
                  <div className="bg-white rounded shadow-sm py-5 px-4">
                  <img src={jeffreyImage}
                  alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                      <h5 className="mb-0">Jeffrey Huang</h5><span className="small text-muted">University of Chicago - Computer Science and Math</span>
                  </div>
              </div>
          </div>

          <div className="row about-text-center">

              <div className="col-xl-3 col-sm-6 mb-5">
                  <div className="bg-white rounded shadow-sm py-5 px-4">
                  <img src={ellynImage}
                  alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                      <h5 className="mb-0">Ellyn Liu</h5><span className="small text-muted">University of Chicago - Computer Science and Music</span>
                  </div>
              </div>


              <div className="col-xl-3 col-sm-6 mb-5">
                  <div className="bg-white rounded shadow-sm py-5 px-4">
                  <img src={nicolasImage}
                  alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                      <h5 className="mb-0">Nicolas Molano</h5><span className="small text-muted">University of Florida - Computer Engineering</span>
                  </div>
              </div>


              <div className="col-xl-3 col-sm-6 mb-5">
                  <div className="bg-white rounded shadow-sm py-5 px-4">
                  <img src={andreImage}
                  alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                      <h5 className="mb-0">Andre Ruiz</h5><span className="small text-muted">Mentor</span>
                  </div>
              </div>
            </div>
      </div>
    )
  }
}
