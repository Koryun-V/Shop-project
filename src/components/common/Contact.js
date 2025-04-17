import React from 'react';
import about_image from "../../assets/image/about.jpg"

const Contact = () => {
  return (
    <div className="new-big-container">
      <div className="new-container">
        <div className="concat_container">
          <span className="contact_header_desc">Contacts</span>
          <iframe
            style={{width: "100%", height: "340px", border: "0", allowFullScreen: "", loading: "lazy"}}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d269.41996008668184!2d43.843547046207256!3d40.7855895836473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4041fbedb78169af%3A0x9688d481af79919a!2sTechno-Educational%20Academy!5e0!3m2!1sru!2sam!4v1744637937194!5m2!1sru!2sam"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>


          <span className="contact_name">
              LLC  Stroyka Store
          </span>


          <div className="contact_big_description">
            <div className="contact_desc">
              <div className="contact_mini_desc">
                 <span className="contact_mini_desc_text">
115114, Moscow, Derbenevskaya embankment, 7, bldg. 8
                 </span>
              </div>
              <div className="contact_mini_desc">
                <span className="contact_mini_desc_text">
Paveletskaya Buses 13, 106, 158, 184, 632 Stop "Derbenevskaya emb., 7"
                </span>
              </div>
            </div>
            <div className="contact_desc">
              <div className="contact_mini_desc">
                <span className="contact_mini_desc_text">OGRN: 1047796688554</span>
                <span className="contact_mini_desc_text">INN 7703528301</span>
                <span className="contact_mini_desc_text">KPP 774850001</span>
                <span className="contact_mini_desc_text">OKTMO 45380000</span>
                <span className="contact_mini_desc_text">OGRN 1047796688554</span>
                <span className="contact_mini_desc_text">Current ruble account: 40702810900001403352</span>
                <span className="contact_mini_desc_text">Bank: JSC Sberbank</span>
                <span className="contact_mini_desc_text">Moscow</span>
                <span className="contact_mini_desc_text">Correspondent account: 30101810200000000700</span>
                <span className="contact_mini_desc_text">BIC: 044525700</span>
              </div>
            </div>

            <div className="contact_desc">
              <div className="contact_mini_desc">
                <span className="contact_mini_desc_text">
                 Customer support info@stroykastore.ru
                </span>
              </div>
            </div>
          </div>
          <div className="about-image_div">
            <img className="about-image" src={about_image} alt="about_image"/>

            <div className="about-image_div_desc_header">
                 <span className="contact_name">
                   About company
                 </span>

              <div className="about-image_desc_text">
                <span className="about-image_desc_mini_text">
                  At StroykaStor you can always buy all the necessary goods for home and garden renovation.
                  Want to renovate your apartment?
                  Are you building a country house? Use construction and finishing materials from our catalog.
                </span>
              </div>
              <div>
                <span className="about-image_desc_mini_text">
                  Fast delivery of construction goods at low prices will make your shopping more enjoyable.
                  Renovation can be cheap if you do it with us. More than 30,000 construction goods are always available for you at low prices every day.
                  StroykaStor is a wide range of goods for home and renovation at a low price; Possibility to order construction and finishing materials for home and garden.
                </span>
              </div>


            </div>
          </div>


        </div>

      </div>

    </div>
  );
};

export default Contact;