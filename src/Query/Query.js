import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import qs from "qs";

export const BASE_URL = "http://localhost:3030/dataVaksin/query"; //dataset kita

export const headers = {
  Accept: "application/sparql-results+json,*/*;q=0.9",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

export const getDataQuery = (value) => { //filter ambil data
    return {
    query: `PREFIX p: <http://human.com/person#>
    PREFIX d: <http://human.com/person/data#>
    
    SELECT ?person ?name ?ttl ?telp ?email ?alamat ?kelurahan ?kecamatan ?pekerjaan ?umur ?vaksin
    WHERE
    {
      ?person d:name         ?name ;
              d:ttl          ?ttl;
              d:telp         ?telp ;
              d:email        ?email ;
              d:alamat       ?alamat ;
              d:kelurahan    ?kelurahan ;
              d:kecamatan    ?kecamatan ;
              d:pekerjaan 	 ?pekerjaan ;
              d:umur			   ?umur ;
              d:vaksin		   ?vaksin .
          
          FILTER (
            regex(?person, "${value}", "i") ||  
            regex(?name, "${value}", "i") ||
            regex(?ttl, "${value}", "i") ||
            regex(?telp, "${value}", "i") ||
            regex(?email, "${value}", "i") ||
            regex(?alamat, "${value}", "i") ||
            regex(?kelurahan, "${value}", "i") ||
            regex(?kecamatan, "${value}", "i") ||
            regex(?pekerjaan, "${value}", "i") ||
            regex(?umur, "${value}", "i") ||
            regex(?vaksin, "${value}", "i") 
          )
    }`,
    }
  }; 

  export const getAllDataQuery = () => {
    return {
      query: `PREFIX p: <http://human.com/person#>
      PREFIX d: <http://human.com/person/data#>
      
      SELECT ?person ?name ?ttl ?telp ?email ?alamat ?kelurahan ?kecamatan ?pekerjaan ?umur ?vaksin
      WHERE {
          ?person d:name         ?name ;
                  d:ttl          ?ttl;
                  d:telp         ?telp ;
                  d:email        ?email ;
                  d:alamat       ?alamat ;
                  d:kelurahan    ?kelurahan ;
                  d:kecamatan    ?kecamatan ;
                  d:pekerjaan 	 ?pekerjaan ;
                  d:umur			   ?umur ;
                  d:vaksin		   ?vaksin .
      }
      ORDER BY ASC(?name)`,
    }
  };

  export const getFilterDataQuery = (value) => {
    return {
      query: `PREFIX p: <http://human.com/person#>
      PREFIX d: <http://human.com/person/data#>
      
      SELECT ?person ?name ?ttl ?telp ?email ?alamat ?kelurahan ?kecamatan ?pekerjaan ?umur ?vaksin
      WHERE
      {
        ?person d:name           ?name ;
                  d:ttl          ?ttl;
                  d:telp         ?telp ;
                  d:email        ?email ;
                  d:alamat       ?alamat ;
                  d:kelurahan    ?kelurahan ;
                  d:kecamatan    ?kecamatan ;
                  d:pekerjaan 	 ?pekerjaan ;
                  d:umur			   ?umur ;
                  d:vaksin		   ?vaksin .
            
            FILTER contains(lcase(str(?name)), lcase(str("${
              value.name ? value.name : ""
            }")))
            FILTER contains(lcase(str(?vaksin)), lcase(str("${
              value.vaksin ? value.vaksin : ""
            }")))
            FILTER contains(lcase(str(?kecamatan)), lcase(str("${
              value.kecamatan ? value.kecamatan : ""
            }")))
            FILTER contains(lcase(str(?kelurahan)), lcase(str("${
              value.kelurahan ? value.kelurahan : ""
            }")))
      }
      ORDER BY ASC (?name)`,
    }
  };