import React, { useEffect, useState, useRef } from "react";
import {BASE_URL, headers, getDataQuery, getAllDataQuery, getFilterDataQuery} from "../Query/Query"; 
import { scroller } from "react-scroll";
import axios from "axios";
import qs from "qs";

const scrollToSection = (flag) => {
  scroller.scrollTo(flag, {
    duration: 800,
    offset:-70,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};

function Home() {

  const [value, setValue] = useState({
    dataVaksin: [], // Save the Result
    input: "", // Save the Keyword
    name: "",
    vaksin: "",
    kelurahan: "",
    kecamatan: "",
  });

  const [searching, setSearching] = useState(false);
  const [statusInput, setStatusInput] = useState(false);

  const getData = async () => {

    // Query to get Data
    const queryData = getDataQuery(value.input);

    setSearching(true);
    setStatusInput(true);
    document.getElementById('myInput').value = '';
    scrollToSection("codes");

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((temp, index) =>
        formatter(temp, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        dataVaksin: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getAllData = async () => {

    // Query to get Data
    const queryData = getAllDataQuery();

    setStatusInput(false);
    scrollToSection("codes");

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((temp, index) =>
        formatter(temp, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        dataVaksin: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getFilterData = async () => {
    
    // Query to get Data
    const queryData = getFilterDataQuery(value);

    setStatusInput(false);
    scrollToSection("codes");

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((temp, index) =>
        formatter(temp, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        dataVaksin: formatted_data,
      });
    } catch (err) {
      console.error(err.response);
    }
  };

  const formatter = (temp, index) => {
    return {
      id: index,
      name: temp.name.value,
      ttl: temp.ttl.value,
      telp: temp.telp.value,
      email: temp.email.value,
      alamat: temp.alamat.value,
      kelurahan: temp.kelurahan.value,
      kecamatan: temp.kecamatan.value,
      pekerjaan: temp.pekerjaan.value,
      umur: temp.umur.value,
      vaksin: temp.vaksin.value,
    };
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      input: event.target.value,
    });
  };

  const handleChangeName = (event) => {
    setValue({
      ...value,
      name: event.target.value,
    });
  };

  const handleChangeVaksin = (event) => {
    setValue({
      ...value,
      vaksin: event.target.value,
    });
  };

  const handleChangeKelurahan = (event) => {
    setValue({
      ...value,
      kelurahan: event.target.value,
    });
  };

  const handleChangeKecamatan = (event) => {
    setValue({
      ...value,
      kecamatan: event.target.value,
    });
  };

  const temp = () => {
    scrollToSection("home");
  }

  const content = value.dataVaksin.map((vaksin) => ( 
    <tr>
      <td style={{padding: "10px"}}>{vaksin.id+1}</td>
      <td style={{padding: "10px", width:"100px"}}>{vaksin.name}</td>
      <td style={{padding: "10px"}}>{vaksin.ttl}</td>
      <td>{vaksin.telp}</td>
      <td>{vaksin.email}</td>
      <td>{vaksin.alamat}</td>
      <td>{vaksin.kelurahan}</td>
      <td>{vaksin.kecamatan}</td>
      <td>{vaksin.pekerjaan}</td>
      <td>{vaksin.umur}</td>
      <td>{vaksin.vaksin}</td>
    </tr>
  ));

  const [filter,setFilter] = useState(false)
  function changeFilter(){
    setFilter(!filter)
  }

  return ( 
    <div className="super_container">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="row">
              <div className="header_content d-flex flex-row align-items-center justify-content-center">
                <div className="logo mr-auto">
                  <div className="d-flex flex-row align-items-end justify-content-start">
                    <span className="logo_text logo_text_style">
                      <a href="/">Vaccinate</a>
                    </span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </header>
      
      {/* Home */}
      <div className="home" id="home">
        <div className="home_slider_container">
          <div className="owl-carousel owl-theme home_slider">
            <div className="slide">
              <div
                className="background_image"
                style={{ backgroundImage: "url(images/background.jpg)" }}
              />
              <div className="home_container">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="home_content">
                        <div className="home_title_container text-center">
                          <div className="home_title islive text-center">
                            <h1>
                              Data Vaksin 
                            </h1>
                          </div>
                        </div>
                        
                        <div className="code_form_container">
                          <form
                            className="code_form"
                            onSubmit={(e) => e.preventDefault()}
                          >
                            <div className="align-items-center justify-content-center">
                              <div className="row">
                                <div className="col-md-8">
                                  <div className="code_form_inputs align-items-center justify-content-center">
                                    <input
                                      id="myInput"
                                      type="text"
                                      className="code_form_input code_form_input_repo"
                                      placeholder="Cari Data Vaksin"
                                      setvalue={value.input}
                                      onChange={handleChange}
                                      required="required"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <button
                                    type="button"
                                    className="code_form_button button"
                                    value="Search"
                                    onClick={getData}
                                  >
                                    <span>Search</span>
                                  </button>
                                </div>
                              </div>
                          
                              <div className="row mt-4 justify-content-center">
                                <div className="col-md-12 mt-4">
                                  <p className="category_text">Website Pencarian Data Orang Yang Melakukan Vaksin Di Wilayah Jakarta Utara</p>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-6 col-md-4 mt-4">
                                  <button
                                    type="button"
                                    className="code_form_button button-get-category"
                                    value="Search"
                                    onClick={getAllData}
                                  >
                                    <span>Show All Data</span>
                                  </button>
                                </div>
                                <div className="col-6 col-md-4 mt-4">
                                  <button
                                    type="button"
                                    className="code_form_button button-get-category"
                                    value="Search"
                                    onClick={changeFilter} 
                                  >
                                    <span>Filter</span>
                                  </button>
                                </div>
                              </div>
                              {
                                filter === false ? (<></>): (
                                  <>
                                  <div className="row mt-2">
                                    <div className="col-6 col-md-4 mt-4">
                                      <input
                                            id="myInput"
                                            type="text"
                                            className="code_form_input"
                                            placeholder="Nama"
                                            setvalue={value.name}
                                            onChange={handleChangeName}
                                          />
                                    </div>
                                    <div className="col-6 col-md-4 mt-4">
                                      <select
                                            setvalue={value.vaksin}
                                            className="custom_dd code_form_input"
                                            onChange={handleChangeVaksin}
                                      >
                                        <option value="">Vaksin Ke</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-6 col-md-4 mt-4">
                                      <select
                                        setvalue={value.kecamatan}
                                        className="custom_dd code_form_input"
                                        onChange={handleChangeKecamatan}
                                      >
                                        <option value="">Kecamatan</option>
                                        <option value="penjaringan">Penjaringan</option>
                                        <option value="pademangan">Pademangan</option>
                                        <option value="tanjung priok">Tanjung Priok</option>
                                        <option value="koja">Koja</option>
                                        <option value="cilincing">Cilincing</option>
                                        <option value="kelapa gading">Kelapa Gading</option>
                                      </select>
                                    </div>
                                    <div className="col-6 col-md-4 mt-4">
                                      <select
                                        setvalue={value.kelurahan}
                                        className="custom_dd code_form_input"
                                        onChange={handleChangeKelurahan}
                                      >
                                        <option value="">Kelurahan</option>
                                        {
                                        value.kecamatan==="penjaringan" ?(
                                        <>
                                        <option value="kapuk muara">Kapuk Muara</option>
                                        <option value="kamal muara">Kamal Muara</option>
                                        <option value="pejagalan">Pejagalan</option>
                                        <option value="penjaringan">Penjaringan</option>
                                        <option value="pluit">Pluit</option>
                                        </>
                                        
                                        ):(<></>)
                                        }
                                        {
                                        value.kecamatan==="pademangan" ?(
                                          <>
                                          <option value="pademangan barat">Pademangan Barat</option>
                                          <option value="pademangan timur">Pademangan Timur</option>
                                          <option value="ancol">Ancol</option>
                                          </>
                                          
                                          ):(<></>)  
                                        }
                                        {
                                        value.kecamatan==="tanjung priok" ?(
                                          <>
                                          <option value="papanggo">Papanggo</option>
                                          <option value="kebon bawang">Kebon Bawang</option>
                                          <option value="warakas">Warakas</option>
                                          <option value="sungai bambu">Sungai Bambu</option>
                                          <option value="sunter agung">Sunter Agung</option>
                                          <option value="sunter jaya">Sunter Jaya</option>
                                          <option value="tanjung priok">Tanjung Priok</option>
                                          </>
                                          
                                          ):(<></>)  
                                        }
                                        {
                                        value.kecamatan==="koja" ?(
                                          <>
                                          <option value="tugu utara">Tugu Utara</option>
                                          <option value="tugu selatan">Tugu Selatan</option>
                                          <option value="rawa badak utara">Rawa Badak Utara</option>
                                          <option value="rawa badak selatan">Rawa Badak Selatan</option>
                                          <option value="lagoa">Lagoa</option>
                                          <option value="koja">Koja</option>
                                          </>
                                          
                                          ):(<></>)  
                                        }
                                        {
                                        value.kecamatan==="cilincing" ?(
                                          <>
                                          <option value="semper barat">Semper Barat</option>
                                          <option value="semper timur">Semper Timur</option>
                                          <option value="sukapura">Sukapura</option>
                                          <option value="marunda">Marunda</option>
                                          <option value="rorotan">Rorotan</option>
                                          <option value="kalibaru">Kalibaru</option>
                                          <option value="cilincing">Cilincing</option>
                                          </>
                                          
                                          ):(<></>)  
                                        }
                                        {
                                        value.kecamatan==="kelapa gading" ?(
                                          <>
                                          <option value="kelapa gading timur">Kelapa Gading Timur</option>
                                          <option value="kelapa gading barat">Kelapa Gading Barat</option>
                                          <option value="pegangsaan dua">Pegangsaan Dua</option>
                                          </>

                                          ):(<></>)  
                                        }
                                      </select>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-6 col-md-4 mt-2">
                                      <button
                                        type="button"
                                        className="code_form_button button-get-category"
                                        value="Search"
                                        onClick={getFilterData}
                                      >
                                        <span>Search</span>
                                      </button>
                                    </div>
                                  </div>
                                  </>
                                )
                              }
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="codes">
        <button
            type="button"
            className="buttonUp code_form_button button"
            onClick={temp}
        >
          <span style={{top:0}}>Go to Search</span>
        </button>
        <div className="container">
          <div className="row row-lg-eq-height">
            <div className="col-lg-8 order-lg-2 order-1">
              <div className="codes_content">
                <div className="section_title">
                  <h1 className="result-text">Hasil Pencarian</h1>
                </div> 
                <div className="tabel">
                  {(() => {
                    if (content.length === 0) {
                      return (
                        <div>
                            {
                              searching === false ?(
                                <>
                                  <img src="/images/Search_Image.png" className="img-notfound mb-4" alt="Waiting to Search"/>
                                  <p className="text-notfound">"Silahkan Masukkan Keyword Untuk Mencari Data Vaksin"</p>
                                </>
                               
                              ):(
                                <>
                                  <h3 className="result2-text ">Keyword : " {value.input} "</h3>
                                  <img src="/images/Search_Image.png" className="img-notfound mb-4" alt="Waiting to Search"/>
                                <p className="text-notfound">"Data Tidak Ditemukan! Silahkan Masukkan Keyword Lain"</p>
                                </>
                              )
                            }
                          
                        </div>
                      );
                    } else {
                      return (
                      
                      <div>
                        <h3 className="result2-text ">Result : {content.length} data</h3>
                        {
                          statusInput === true ?(<h3 className="result2-text ">Keyword : " {value.input} "</h3>
                          ):(<></>)
                        }
                        
                        <table className="resulttbl">
                          <tr className="judul">
                            <th style={{padding: "10px"}}>No</th>
                            <th style={{padding: "10px", width: "20%"}}>Nama</th>
                            <th style={{padding: "10px", width: "20%"}}>Tempat, Tanggal Lahir</th>
                            <th style={{padding: "10px", width: "15%"}}>Telpon</th>
                            <th style={{padding: "10px", width: "10%"}}>Email</th>
                            <th style={{padding: "10px", width: "30%"}}>Alamat</th>
                            <th style={{padding: "10px"}}>Kelurahan</th>
                            <th style={{padding: "10px", width: "30%"}}>Kecamatan</th>
                            <th style={{padding: "10px"}}>Pekerjaan</th>
                            <th style={{padding: "10px"}}>Umur</th>
                            <th style={{padding: "10px"}}>Vaksin</th>
                          </tr>
                          {content}
                        </table>
                      </div>);
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
