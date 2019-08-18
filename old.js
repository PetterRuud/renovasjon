function RenovationCpt(a, b) {
  this.options = b, this._sourceElementId = a, this._tabIdArray = {
      mainTabId: 1,
      depoTabId: "",
      sorteringTabId: null,
      meldingTabId: null
  }, this._mainUrl = RENOVATION.URL.RenovationUrl._mainUrl(), this._marker = {}, this._map, this._blobArray = [], this._CoordinateArray = [], this._selectedBlob = "", this._autocompleteAddresses = [], this._autocompleteAddressesPure = [], this._autoCompleteCoordinates = [], this._autoCompleteMunicipalityNo = [], this._autoCompleteMunicipalityName = [], this._autoCompleteLogo = [], this._roadNo = [], this._fraskjonResponse = "", this._kalenderResponse = "", this._searchElement = {}, this._municipalityData = [], this._selectedMuniciaplityName = "", this._selectedMuniciplalityNumber = 0, this._municipalitiesName = [], this._municipalitiesNr = [], this._municipalityIconUrl = "", this.errorText = "", this._gateKode = "", this._gateNavn = "", this._picturePath = ""
}
Date.prototype.mGetDay = function() {
  return (this.getDay() + 6) % 7
}, String.prototype.startsWith = function(a) {
  return 0 == this.indexOf(a)
};
var RENOVATION = window.RENOVATION || {
  ver: "1.3"
};
RENOVATION.Extention = {
  unique: function(a) {
      return $.grep(a, function(b, c) {
          return c == $.inArray(b, a)
      })
  },
  extractLast: function(a) {
      return split(a).pop()
  }
}, RENOVATION.License = {
  _isSms: !1,
  _isMelding: !1
}, RENOVATION.APP = {
  _redirectToApp: function() {
      var a;
      if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) a = window.confirm("Ã˜nsker du Ã¥ laste ned appen?"), a && (window.location.href = "https://itunes.apple.com/no/app/min-renovasjon/id606138819?mt=8");
      else {
          if (/windows phone/i.test(navigator.userAgent.toLowerCase())) return;
          navigator.userAgent.match(/Android/i) && (a = window.confirm("Ã˜nsker du Ã¥ laste ned appen?"), a && (window.location.href = "https://play.google.com/store/apps/details?id=no.norkart.komtek.renovasjon.client&hl=no"))
      }
  }
}, RENOVATION.URL = {
  RenovationUrl: {
      _usualUrl: {
          komtekskyUrl: "",
          publikumMeldingTjeneste: "",
          appendixUrl: "/api/innstillinger/",
          deponierUrl: "/api/deponier/",
          fraskjonerUrl: "/api/fraksjoner/",
          sorteringsinfoUrl: "/api/sorteringsinfo/",
          tommekalenderUrl: "/api/tommekalender/?",
          returpunkterUrl: "/api/returpunkter/"
      },
      _mainUrl: function() {
          return {
              registeredCustomerLink: "https://www.webatlas.no/wacloud/servicerepository/CatalogueService.svc/json/GetRegisteredAppCustomers?Appid=MobilOS-NorkartRenovasjon",
              getCapabilitiesLink: "https://www.webatlas.no/wacloud/servicerepository/CatalogueService.svc/json/GetAppServices?AppId=MobilOS-NorkartRenovasjon",
              searchAddressLink: "https://services.webatlas.no/GISLINE.Web.Services.Search.SOLR3.0/Service.svc/json/addressWeighted?",
              searchGrnrBnrLink: "https://services.webatlas.no/GISLINE.Web.Services.Search.SOLR3.0/Service.svc/json/propertyWeighted?"
          }
      },
      _buildSearchAddressLink: function(a, b, c) {
          return RENOVATION.URL.RenovationUrl._mainUrl().searchAddressLink + "searchString=" + a + "&municipality=" + b + "&weightedMunicipality=" + b + "&firstIndex=" + c + "&maxNoOfResults=20&language=NO&coordsys=84&clientID=Android-Renovasjon-" + b
      },
      _buildRegisteredCustomerLink: function() {
          return RENOVATION.URL.RenovationUrl.proxyServerLink() + "?server=" + RENOVATION.URL.RenovationUrl._mainUrl().registeredCustomerLink
      },
      hostServer: function() {
          return "norkartrenovasjon.azurewebsites.net"
      },
      proxyServerLink: function() {
          return "https://" + RENOVATION.URL.RenovationUrl.hostServer() + "/proxyserver.ashx"
      },
      buildGetAppServicesLink: function(a) {
          return RENOVATION.URL.RenovationUrl.proxyServerLink() + "?server=" + a
      },
      _buildKomtekSkyLink: function() {
          return RENOVATION.URL.RenovationUrl.proxyServerLink() + "?server=" + RENOVATION.URL.RenovationUrl._usualUrl.komtekskyUrl
      },
      _sendAsyncRequest: function(a, b, c, d) {
          var e = new XMLHttpRequest;
          e.open("GET", a + b, !0), d.isHeaders && (e.setRequestHeader("RenovasjonAppKey", "AE13DEEC-804F-4615-A74E-B4FAC11F0A30"), e.setRequestHeader("Content-Type", d.contentType), e.setRequestHeader("Kommunenr", d.selectedMuniciplalityNumber)), e.addEventListener("load", function() {
              4 === e.readyState && 200 === e.status && c(e.response)
          }, !1), e.send()
      },
      _getMunicipalities: function(a) {
          this._sendAsyncRequest(RENOVATION.URL.RenovationUrl._buildRegisteredCustomerLink(), "", a, {
              isHeaders: !1
          })
      },
      _getSorteringsInfo: function(a, b) {
          this._sendAsyncRequest(RENOVATION.URL.RenovationUrl._buildKomtekSkyLink(), RENOVATION.URL.RenovationUrl._usualUrl.sorteringsinfoUrl, b, {
              isHeaders: !0,
              selectedMuniciplalityNumber: a
          })
      },
      _getDeponier: function(a, b) {
          this._sendAsyncRequest(RENOVATION.URL.RenovationUrl._buildKomtekSkyLink(), RENOVATION.URL.RenovationUrl._usualUrl.deponierUrl, b, {
              isHeaders: !0,
              selectedMuniciplalityNumber: a
          })
      },
      _getAppendix: function(a, b) {
          this._sendAsyncRequest(RENOVATION.URL.RenovationUrl._buildKomtekSkyLink(), RENOVATION.URL.RenovationUrl._usualUrl.appendixUrl, b, {
              isHeaders: !0,
              selectedMuniciplalityNumber: a
          })
      },
      _getKomtekSkyURL: function(a, b) {
          this._sendAsyncRequest(RENOVATION.URL.RenovationUrl.buildGetAppServicesLink(a), "", b, {
              isHeaders: !1
          })
      },
      sendSyncRequest: function(a, b, c) {
          var d = new XMLHttpRequest;
          return d.open("GET", a + b, !1), c.isHeaders && (d.setRequestHeader("Kommunenr", c.selectedMuniciplalityNumber), d.setRequestHeader("RenovasjonAppKey", "AE13DEEC-804F-4615-A74E-B4FAC11F0A30"), d.setRequestHeader("Content-Type", "application/json; charset=UTF-8;")), d.send(), d.responseText
      }
  },
  HeaderScript: {
      _placeHeaderScripts: function() {
          var a = document.getElementsByTagName("head")[0],
              b = document.createElement("script");
          b.src = "https://code.jquery.com/jquery-1.10.2.min.js", b.async = !0, a.appendChild(b);
          var c = document.createElement("script");
          c.src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js", c.async = !0, a.appendChild(c);
          var d = document.createElement("link");
          d.setAttribute("rel", "stylesheet"), d.setAttribute("href", "https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"), a.appendChild(d);
          var e = document.createElement("link");
          e.setAttribute("rel", "stylesheet"), e.setAttribute("href", "https://www.webatlas.no/sh/3/v/101014/webatlas.css"), a.appendChild(e);
          var f = document.createElement("script");
          f.src = "https://www.webatlas.no/sh/3/v/101014/webatlas.js", f.async = !0, a.appendChild(f)
      }
  },
  ScriptLoader: {
      _loadScript: function(a, b) {
          var c = document.createElement("script");
          c.src = a, c.async = !0, c.readyState ? c.onreadystatechange = function() {
              c.readyState && "loaded" != c.readyState && "complete" != c.readyState || (c.onreadystatechange = null, document.getElementsByTagName("head")[0].removeChild(c), b())
          } : c.onload = function() {
              b()
          }, document.getElementsByTagName("head")[0].appendChild(c)
      }
  }
}, RENOVATION.DOM = {
  _adjustTabSize: function(a, b) {
      a.style.width = b.innbyggerMelding ? "20%" : "25%"
  },
  _createSpinnerImage: function() {
      var a = document.createElement("img");
      return a.src = "https://" + RENOVATION.URL.RenovationUrl.hostServer() + "/Pictures/loader0.gif", a.style.width = "100%", a.style.height = "100%", a
  },
  _createhyperlinks: function(a) {
      var b = RENOVATION.DOM._createHyperlink({
              className: "t",
              textContent: "TÃ¸mmekalender/SMS"
          }, a),
          c = RENOVATION.DOM._createHyperlink({
              className: "t",
              textContent: "Sortering"
          }, a),
          d = RENOVATION.DOM._createHyperlink({
              className: "t",
              textContent: "Gjennvinningsstasjoner"
          }, a),
          e = RENOVATION.DOM._createHyperlink({
              className: "t",
              textContent: "Avviksmeldinger"
          }, a),
          f = RENOVATION.DOM._createActiveHyperlink({
              className: "active",
              textContent: "Returpunkter"
          }, a);
      return a.innbyggerMelding ? [b, f, c, d, e] : [b, f, c, d]
  },
  _createButtons: function(a) {
      var b = RENOVATION.DOM._createButton({
              className: "t",
              textContent: "TÃ¸mmekalender/SMS"
          }, a),
          c = RENOVATION.DOM._createButton({
              className: "t",
              textContent: "Sortering"
          }, a),
          d = RENOVATION.DOM._createButton({
              className: "t",
              textContent: "Gjennvinningsstasjoner"
          }, a),
          e = RENOVATION.DOM._createButton({
              className: "t",
              textContent: "Avviksmeldinger"
          }, a),
          f = RENOVATION.DOM._createActiveButton({
              className: "active",
              textContent: "Returpunkter"
          }, a);
      return a.innbyggerMelding ? [b, f, c, d, e] : [b, f, c, d]
  },
  _createActiveHyperlink: function(a, b) {
      var c = document.createElement("button");
      return c.className = a.className, c.onfocus = function() {
          c.style.backgroundColor = b.onfocusColor
      }.bind(this), c.onblur = function() {
          c.style.backgroundColor = "t" == c.className ? b.inactiveTabColor : b.activeTabColor
      }.bind(this), c.style.backgroundColor = b.hideFourLastFans ? b.inactiveTabColor : b.activeTabColor, c.textContent = a.textContent, c
  },
  _createActiveButton: function(a, b) {
      var c = document.createElement("button");
      return c.className = a.className, c.onfocus = function() {
          c.style.backgroundColor = b.onfocusColor
      }.bind(this), c.onblur = function() {
          c.style.backgroundColor = "t" == c.className ? b.inactiveTabColor : b.activeTabColor
      }.bind(this), c.style.backgroundColor = b.hideFourLastFans ? b.inactiveTabColor : b.activeTabColor, c.textContent = a.textContent, c
  },
  _createHyperlink: function(a, b) {
      var c = document.createElement("button");
      return c.style.backgroundColor = b.hideFourLastFans ? b.activeTabColor : b.inactiveTabColor, c.className = a.className, c.textContent = a.textContent, c.onfocus = function() {
          c.style.backgroundColor = b.onfocusColor
      }.bind(this), c.onblur = function() {
          c.style.backgroundColor = c.className == a.className ? b.inactiveTabColor : b.activeTabColor
      }.bind(this), c
  },
  _createButton: function(a, b) {
      var c = document.createElement("button");
      return c.style.backgroundColor = b.hideFourLastFans ? b.activeTabColor : b.inactiveTabColor, c.className = a.className, c.textContent = a.textContent, c.onfocus = function() {
          c.style.backgroundColor = b.onfocusColor
      }.bind(this), c.onblur = function() {
          c.style.backgroundColor = c.className == a.className ? b.inactiveTabColor : b.activeTabColor
      }.bind(this), c
  },
  _initSelectElement: function(a) {
      (!a.kommunesamarbeid && 1 == a.kommunenummere.length || a.searchSeveralMunicipalitiesAtOnce) && (document.getElementById("select").style.display = "none")
  },
  _createtabList: function(a) {
      var b, c = RENOVATION.DOM._createButtons(a),
          d = [],
          e = document.createElement("ul");
      for (b = 0; b < c.length; b++) d[b] = document.createElement("li"), d[b].id = b + 1, d[b].className = "t", RENOVATION.DOM._adjustTabSize(d[b], a), d[b].appendChild(c[b]), e.appendChild(d[b]);
      if (a.hideFourLastFans) {
          var f = document.createElement("ul");
          return d[0].style.width = "100%", d[0].hidden = "hidden", f.appendChild(d[0]), f
      }
      if (a.hideThreeLastFans) {
          var g = document.createElement("ul");
          return g.style.width = "100%", d[0].style.width = "100%", d[1].style.width = "100%", g.appendChild(d[0]), g.appendChild(d[1]), g
      }
      return e
  },
  _createAccordionHeaders: function(a) {
      for (var b = RENOVATION.DOM._createhyperlinks(a), c = [], d = 0; d < b.length; d++) c[d] = document.createElement("h2"), c[d].style.borderBottom = "1px solid white", c[d].id = d + 1, c[d].appendChild(b[d]);
      return c
  },
  _createDivSpinner: function(a) {
      var b = document.createElement("div");
      return b.id = "spinner", b.appendChild(a), b
  },
  _createPanel3: function() {
      var a = document.createElement("div");
      return a.id = "t3", a.className = "panel", a.style = "display:none;", a
  },
  _createPanel4: function() {
      var a = document.createElement("div");
      return a.id = "t4", a.className = "panel", a.style = "display:none;", a
  },
  _createPanel5: function(a) {
      var b = document.createElement("div");
      return b.id = "t5", b.className = "panel", b.style = "display:none;float:left;", b.innerHTML = "<div id='help'><br/><span style='font-size:" + a.fontSize + "'>Vennligst sÃ¸k opp din adresse eller din eiendom</span></div>", b
  },
  _createInledningElement: function(a) {
      var b = document.createElement("label");
      return b.textContent = "Du sÃ¸ker pÃ¥ adresse", b.id = "innledning", b.style.fontSize = a.fontSize, b.style.fontFamily = a.fontFamily, b.style.color = "black", b.setAttribute("for", "search"), b
  },
  _createPanel1: function(a) {
      var b = document.createElement("div");
      b.id = "t1", b.className = "panel", b.style = "display:none;", b.innerHTML = "<div id='help'><br/><span style='font-size:" + a.fontSize + "'>Vennligst sÃ¸k opp din adresse eller din eiendom</span></div>";
      var c = document.createElement("p");
      c.id = "pElemAddress", c.style.fontSize = a.fontSize;
      var d = document.createElement("p");
      d.id = "label", d.style.fontSize = a.fontSize;
      var e = document.createElement("p");
      e.id = "labellink", e.style.fontSize = a.fontSize, b.appendChild(c), b.appendChild(d);
      var f = document.createElement("div");
      return f.id = "calendar", b.appendChild(f), b.appendChild(e), b
  },
  _createPanel2: function(a) {
      var b = document.createElement("div");
      b.id = "t2", b.className = "panel";
      var c = document.createElement("map");
      return c.id = "map", c.style.height = a.height - 50 + "px", a.hideThreeLastFans && (c.style.height = "74%"), b.appendChild(c), b
  },
  _createMainDivElement: function(a) {
      var b = document.createElement("div");
      return b.style.color = a.fontColor, b.style.fontFamily = a.fontFamily, b.style.fontSize = a.fontSize, b.style.backgroundColor = a.cptBackgroundColor, b.className = "table", b
  },
  _createInputElement: function() {
      var a = document.createElement("input");
      return a.value = "Adresse eller gÃ¥rdsnr/bruksnr", a.style.fontStyle = "italic", a.style.fontStyle = "gray", a.id = "search", a.onfocus = function() {
          this.value = "", this.style.fontStyle = "normal", a.style.fontStyle = "black", $("#searchAlert").empty()
      }, a
  },
  _createfadeInFadeoutPopup: function(a) {
      var b = document.createElement("div");
      return b.id = "messagePopup", b.style.fontStyle = a.fontFamily, b.onclick = function() {
          $("#overlay").fadeOut(50), document.getElementById("messagePopup").style.display = "none"
      }, b
  },
  _displayPopup: function(a) {
      $("#overlay").fadeIn(50), document.getElementById("messagePopup").innerHTML = "<span><p>" + a + "</p></span>", document.getElementById("messagePopup").style.display = "inline-block"
  },
  _createPanelWrapper: function(a, b) {
      var c = RENOVATION.DOM._createPanel1(b),
          d = RENOVATION.DOM._createPanel2(b),
          e = RENOVATION.DOM._createPanel3(),
          f = RENOVATION.DOM._createPanel4(),
          g = RENOVATION.DOM._createPanel5(b),
          h = document.createElement("div");
      h.className = "panelWrapper", h.appendChild(a[0]), h.appendChild(c);
      var i = document.createElement("div");
      i.className = "panelWrapper", i.appendChild(a[1]), i.appendChild(d);
      var j = document.createElement("div");
      j.className = "panelWrapper", j.appendChild(a[2]), j.appendChild(e);
      var k = document.createElement("div");
      if (k.className = "panelWrapper", k.appendChild(a[3]), k.appendChild(f), !b.innbyggerMelding) return [h, i, j, k];
      var l = document.createElement("div");
      return l.className = "panelWrapper", l.appendChild(a[4]), l.appendChild(g), [h, i, j, k, l]
  },
  _responsiveResizing: function(a) {
      var b = window.innerWidth > 0 ? window.innerWidth : screen.width;
      b > 100 && 490 > b && null != document.getElementById("map") && (document.getElementById("map").style.height = a.height / 2 + "px"), b >= 120 && 600 >= b ? $(".wrapper").attr("style", "background-color:" + a.backgroundColor + "; border-color:" + a.backgroundColor + ";") : $(".wrapper").attr("style", "background-color:" + a.backgroundColor + "; border-color:" + a.backgroundColor + ";min-height:" + a.height + "px;"), a.hideFourLastFans && $("#t1").attr("style", "background-image:url('https://" + RENOVATION.URL.RenovationUrl.hostServer() + "/Pictures/KOMTEK_RENOVASJON_unaltered_hirez.png');background-size:60% 70%;background-repeat:no-repeat; background-position: center center; width:100%; height:100%; padding-top:30%;")
  },
  _toggleAvviksmeldingerShowHide: function(a) {
      a.innbyggerMelding ? ($(".tabs ul li").attr("style", "width:20%;"), $(".wrapper h2#4 button").is(":visible") && $(".wrapper h2#5 button").show()) : ($(".tabs ul li").attr("style", "width:25%;"), $(".tabs ul li#5 button").hide(), $(".wrapper h2#5 button").hide())
  },
  _toggleSmsShowHide: function() {
      RENOVATION.License._isSms ? ($(".wrapper h2#1 button").text("TÃ¸mmekalender/SMS"), $(".tabs ul li#1 button").text("TÃ¸mmekalender/SMS")) : ($(".wrapper h2#1 button").text("TÃ¸mmekalender"), $(".tabs ul li#1 button").text("TÃ¸mmekalender"), $("#sms-div").hide())
  },
  _showMainMenuTitles: function(a) {
      $(".tabs ul li#5 button").text(JSON.parse(a).TittelAvviksmelding), $(".tabs ul li#4 button").text(JSON.parse(a).TittelDeponi), $(".tabs ul li#3 button").text(JSON.parse(a).TittelSortering), $(".wrapper h2#5 button").text(JSON.parse(a).TittelAvviksmelding), $(".wrapper h2#4 button").text(JSON.parse(a).TittelDeponi), $(".wrapper h3#4 button").text(JSON.parse(a).TittelSortering)
  }
}, RENOVATION.Behavior = {
  _initTabsOnDocumentready: function(a, b, c) {
      $(".tabs ul li button").each(function() {
          $(".tabs ul li button").removeClass("active"), $(".tabs ul li button").addClass("t"), $(".tabs ul li button").attr("style", "background-color:" + b.inactiveTabColor + ";")
      }), $(".tabs ul li#" + a + " button").removeClass("t"), $(".tabs ul li#" + a + " button").addClass("active"), $(".tabs ul li#" + a + " button").attr("style", "background-color:" + b.activeTabColor + ";"), c = a, $(".panel").each(function() {
          $(this).hide()
      }), $("#t" + a).attr("style", "display:inline-block"), $("#t" + a).show(), $(".wrapper h2 a").each(function() {
          $(".wrapper h2 a").removeClass("active"), $(".wrapper h2 a").addClass("t"), $(".wrapper h2 a").attr("style", "background-color:" + b.inactiveTabColor + ";")
      }), $(".wrapper h2#" + a + " a").removeClass("t"), $(".wrapper h2#" + a + " a").addClass("active"), $(".wrapper h2#" + a + " a").attr("style", "background-color:" + b.activeTabColor + ";"), $(".panel").each(function() {
          $(this).hide()
      }), $("#t" + a).attr("style", "display:inline-block"), $("#t" + a).show()
  }
}, RENOVATION.URL.RESPONSE = {
  _handleAppendixResponse: function(a, b) {
      "" != a && (RENOVATION.License._isSms = JSON.parse(a).LisensSms, b.innbyggerMelding = JSON.parse(a).LisensMelding, RENOVATION.DOM._toggleAvviksmeldingerShowHide(b), RENOVATION.DOM._toggleSmsShowHide(), RENOVATION.DOM._showMainMenuTitles(a))
  },
  _handleKontekSkyUrlResponse: function(a) {
      for (var b = JSON.parse(a), c = 0; c < b.length; c++) "KomtekSky_REN" == b[c].Name && (RENOVATION.URL.RenovationUrl._usualUrl.komtekskyUrl = b[c].URL), "Publikumsmelding_REN" == b[c].Name && (RENOVATION.URL.RenovationUrl._usualUrl.publikumMeldingTjeneste = b[c].URL)
  }
}, RENOVATION.URL.REQUESTS = {
  _getCategory: function(a, b) {
      var c = new XMLHttpRequest,
          d = a;
      3 == a.toString().length && (d = "0" + a), c.open("GET", RENOVATION.URL.RenovationUrl._usualUrl.publikumMeldingTjeneste + "/categories?municipality=" + d + "&apikey=3b912cdd-27c7-4b59-a09d-2a4614a9df32&format=json", !0), c.onreadystatechange = function() {
          4 === c.readyState && 200 === c.status && b(c.responseText)
      }, c.send()
  },
  _sendInnbyggerMelding: function(a, b, c) {
      var d = new XMLHttpRequest,
          e = "";
      3 === b.toString().length && (e = "0" + b);
      var f = a;
      d.open("POST", RENOVATION.URL.RenovationUrl.proxyServerLink() + "?server=" + RENOVATION.URL.RenovationUrl._usualUrl.publikumMeldingTjeneste + "/sendmessage", !0), d.setRequestHeader("Kommunenr", e), d.setRequestHeader("RenovasjonAppKey", "AE13DEEC-804F-4615-A74E-B4FAC11F0A30"), d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), d.onreadystatechange = function() {
          4 == d.readyState && 200 == d.status && c(d.responseText)
      }, d.send("obj=" + f)
  },
  _uploadImage: function(a, b, c) {
      var d = document.getElementById("getimage" + b).files[0],
          e = new FormData;
      e.append(d.name, d);
      var f = new XMLHttpRequest;
      f.open("POST", a, !0), f.onreadystatechange = function(a) {
          if (4 == f.readyState && 200 == f.status) {
              var e = document.getElementById("imageLabel" + b);
              e.textContent = d.name, c(a)
          }
      }.bind(this), f.send(e)
  },
  _makeSmsRequest: function(a, b, c, d, e, f, g) {
      var h = new XMLHttpRequest,
          i = "Mobilnr=" + a + "&Klokkeslett=" + b + "&Adresse=" + encodeURIComponent(c) + "&FraksjonIdenter=" + e + "&Gid=" + d;
      h.open("POST", RENOVATION.URL.RenovationUrl._buildKomtekSkyLink() + "/api/sms/BestillVarsling", !0), h.setRequestHeader("Kommunenr", f), h.setRequestHeader("RenovasjonAppKey", "AE13DEEC-804F-4615-A74E-B4FAC11F0A30"), h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), h.onreadystatechange = function() {
          4 == h.readyState && 200 == h.status && g(h.responseText)
      }, h.send(i)
  }
}, RENOVATION.innbyggermelding = {
  _generateMessage: function(a, b, c, d, e, f, g, h, i) {
      void 0 == h && (h = 0);
      var j = '{"municipality":"' + a + '" ,"Message":{"CustomerId":"' + h + '","MessageTypeId":' + g + ',"Description":"' + b + '","SenderEmail":"' + c + '","SenderPhoneNumber":"' + d + '","Latitude":0,"Longitude":0,"Address":{"StreetName":"' + e + '","House":""},"ExactAddress":true,"PlaceName":"' + i + '","Picture":"' + encodeURIComponent(f) + '"},"apikey":"3b912cdd-27c7-4b59-a09d-2a4614a9df32"}';
      return j
  }
}, RENOVATION.Utils = {
  Time: {
      _formatTime: function() {
          var a = (new Date).toLocaleTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
          return a
      }
  },
  Date: {
      _convertDateToString: function(a) {
          var b = [];
          if ("" == a || void 0 === a) return a;
          var c = new String(a);
          return c.indexOf(",") >= 0 ? b = c.split(",") : (b[0] = c, b)
      },
      _formatDate: function(a) {
          var b = new Date(a),
              c = b.getDate(),
              d = b.getMonth() + 1,
              e = b.getFullYear();
          return e + "-" + d + "-" + c
      },
      _FormatStringDate: function(a) {
          if (void 0 === a || "" == a || null == a) return "-";
          var b, c = new Date(a),
              d = window.navigator.userAgent;
          if (d.match(/iPad/i) || d.match(/iPhone/i)) return b = a.split("T")[0].split("-"), b[2] + "." + b[1] + "." + b[0].split("0")[1];
          if ("Invalid Date" == c) return b = a.split("T")[0].split("-"), b[2] + "." + b[1] + "." + b[0].split("0")[1];
          var e, f = "",
              g = "",
              h = ["Ma", "Ti", "On", "To", "Fr", "LÃ¸", "SÃ¸"],
              i = c.toLocaleDateString();
          return -1 != i.indexOf(".") ? (1 == i.split(".")[0].length && (f = "0"), 1 == i.split(".")[1].length && (g = "0"), e = h[c.mGetDay()] + " " + f + i.split(".")[0] + "." + g + i.split(".")[1]) : (b = a.split("T")[0].split("-"), e = b[2] + "." + b[1] + "." + b[0].split("0")[1]), e
      }
  },
  GID: {
      _beautifyGID: function(a) {
          var b = new String(a),
              c = b.substring(4, 9),
              d = b.substring(9, 13),
              e = b.substring(13, 17),
              f = b.substring(17, 20);
          return b = Number(c) + "/" + Number(d) + "/" + Number(e) + "/" + Number(f)
      }
  },
  Validation: {
      Adress: {
          _formatAddress: function(a) {
              for (var b = a.split(" "), c = "", d = 0; d < b.length - 2; d++) c += b[d] + " ";
              return encodeURIComponent(c)
          },
          _removeMunciaplityName: function(a, b) {
              return b.indexOf(a) > -1 ? b.replace(a, "") : void 0
          },
          _extractHusNrFromGatenavn: function(a) {
              var b = a.split(" ");
              return b[b.length - 1].trim()
          },
          _extractGatenavnfromAdress: function(a) {
              var b = a.replace(/^\D+/g, "");
              return a.indexOf(b) > -1 ? a.replace(b, "") : void 0
          }
      },
      Email: {
          _emailValidationAlone: function(a) {
              var b = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
              return b.test(a) ? !0 : !1
          },
          _emailValidation: function(a, b, c, d) {
              var e = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
              return e.test(a) ? (b.textContent = "", c.disabled = !1, d.style.borderColor = "green", !0) : (b.textContent = " Skriv inn gyldig e-postadresse.", b.style.color = "red", d.style.borderColor = "red", c.disabled = !0, !1)
          }
      },
      PhoneNumber: {
          _mobilePhoneValidationAlone: function(a) {
              return 8 != a.length || isNaN(a) ? !1 : !0
          },
          _mobilePhoneValidation: function(a, b, c, d) {
              var e = /^\d{8}$/;
              return 8 != a.length || isNaN(a) ? e.test(a) && !isNaN(a) ? (b.textContent = "", c.disabled = !1, d.style.borderColor = "green", !0) : (b.textContent = " Telefonnummer: 8 siffer", b.style.color = "red", d.style.borderColor = "red", c.disabled = !0, !1) : (b.textContent = "", c.disabled = !1, d.style.borderColor = "green", !0)
          }
      }
  },
  host: {
      _getHost: function() {
          var a = document.getElementsByTagName("script"),
              b = a[a.length - 2].src,
              c = b.match(new RegExp("http?://[^/]*"));
          return c[0].replace("http://", "")
      }
  }
}, RenovationCpt.prototype = {
  _createRenovationElement: function() {
      var a, b = document.getElementById(this._sourceElementId),
          c = RENOVATION.DOM._createMainDivElement(this.options),
          d = [];
      for (a = 0; 5 > a; a++) d[a] = document.createElement("div"), d[a].className = "row";
      var e = document.createElement("select");
      e.id = "select";
      var f = RENOVATION.DOM._createInputElement(),
          g = document.createElement("span");
      g.id = "searchAlert";
      var h = RENOVATION.DOM._createInledningElement(this.options),
          i = document.createElement("div");
      i.className = "tabscontainer";
      var j = document.createElement("div");
      j.className = "tabs";
      var k = RENOVATION.DOM._createtabList(this.options);
      j.appendChild(k), i.appendChild(j);
      var l = document.createElement("div");
      l.className = "wrapper";
      var m = RENOVATION.DOM._createAccordionHeaders(this.options),
          n = RENOVATION.DOM._createPanelWrapper(m, this.options);
      if (this.options.hideFourLastFans) l.appendChild(n[0]);
      else
          for (a = 0; a < n.length; a++) l.appendChild(n[a]);
      for (i.appendChild(l), d[0].appendChild(e), d[1].appendChild(h), d[1].appendChild(f), d[1].appendChild(g), d[3].appendChild(i), a = 0; 5 > a; a++) c.appendChild(d[a]);
      c.className = "non-printable", b.appendChild(c);
      var o = RENOVATION.DOM._createSpinnerImage(),
          p = RENOVATION.DOM._createDivSpinner(o),
          q = document.createElement("overlay");
      q.id = "overlay";
      var r = RENOVATION.DOM._createfadeInFadeoutPopup(this.options);
      b.appendChild(r), b.appendChild(p), b.appendChild(q)
  },
  _buildTommeKalenderParameters: function(a, b, c, d, e, f, g) {
      if (this._gateKode = c, this._gateNavn = b, null != b) {
          var h = b.split(" ");
          b = "";
          for (var i = 0; i < h.length - 1; i++) b += h[i] + " "
      }
      return null == f ? null == e ? encodeURI(RENOVATION.URL.RenovationUrl._usualUrl.tommekalenderUrl + "kommunenr=" + a + "&gatenavn=" + b + "&gatekode=" + c + "&husnr=" + d) : RENOVATION.URL.RenovationUrl._usualUrl.tommekalenderUrl + "eiendomString=" + encodeURIComponent(e) : null == e ? encodeURI(RENOVATION.URL.RenovationUrl._usualUrl.tommekalenderUrl + "kommunenr=" + a + "&gatenavn=" + b + "&gatekode=" + c + "&husnr=" + d + "&dato=" + RENOVATION.Utils.Date._formatDate(f) + "&fraDato=" + RENOVATION.Utils.Date._formatDate(g)) : RENOVATION.URL.RenovationUrl._usualUrl.tommekalenderUrl + "eiendomString=" + encodeURIComponent(e) + "&dato=" + RENOVATION.Utils.Date._formatDate(f) + "&fraDato=" + RENOVATION.Utils.Date._formatDate(g)
  },
  _buildKomtekSkyLink: function() {
      return RENOVATION.URL.RenovationUrl.proxyServerLink() + "?server=" + RENOVATION.URL.RenovationUrl._usualUrl.komtekskyUrl
  },
  _getFraskjoner: function(a) {
      RENOVATION.URL.RenovationUrl._sendAsyncRequest(this._buildKomtekSkyLink(), RENOVATION.URL.RenovationUrl._usualUrl.fraskjonerUrl, a, {
          isHeaders: !0,
          selectedMuniciplalityNumber: this._selectedMuniciplalityNumber
      })
  },
  _getTommeKalender: function(a, b, c, d, e, f, g, h) {
      null == f ? null == e ? RENOVATION.URL.RenovationUrl._sendAsyncRequest(this._buildKomtekSkyLink(), this._buildTommeKalenderParameters(a, b, c, d), h, {
          isHeaders: !0,
          selectedMuniciplalityNumber: this._selectedMuniciplalityNumber
      }) : RENOVATION.URL.RenovationUrl._sendAsyncRequest(this._buildKomtekSkyLink(), this._buildTommeKalenderParameters(null, null, null, null, e), h, {
          isHeaders: !0,
          selectedMuniciplalityNumber: this._selectedMuniciplalityNumber
      }) : null == e ? RENOVATION.URL.RenovationUrl._sendAsyncRequest(this._buildKomtekSkyLink(), this._buildTommeKalenderParameters(a, b, c, d, null, f, g), h, {
          isHeaders: !0,
          selectedMuniciplalityNumber: this._selectedMuniciplalityNumber
      }) : RENOVATION.URL.RenovationUrl._sendAsyncRequest(this._buildKomtekSkyLink(), this._buildTommeKalenderParameters(null, null, null, null, e, f, g), h, {
          isHeaders: !0,
          selectedMuniciplalityNumber: this._selectedMuniciplalityNumber
      })
  },
  _getAllReturPunkter: function(a) {
      RENOVATION.URL.RenovationUrl._sendAsyncRequest(this._buildKomtekSkyLink(), RENOVATION.URL.RenovationUrl._usualUrl.returpunkterUrl, a, {
          isHeaders: !0,
          selectedMuniciplalityNumber: this._selectedMuniciplalityNumber
      })
  },
  _handleSorteringResponse: function(a) {
      if ($("#t3").empty(), "" != a) {
          var b, c = JSON.parse(a),
              d = "<div style='display:block; width:100%;' id='t3container'><div style='margin-top: auto; height:100%;' class='men'><ul style='list-style-type:none;'>";
          for (b = 0; b < c.length; b++) d += "<li style='text-decoration:none;  margin-top:-1px;' class='sort' id='" + b + "'><button>" + c[b].Tittel + "</button></li>";
          for (d += "</ul></div>", b = 0; b < c.length; b++) d += "<h1 class='hcontainer'><button  id='s" + b + "'>" + c[b].Tittel + "</button></h1><div id ='sorts" + b + "' style='display:none; margin-top:1%; margin-left:1%; width:60%; ' class='sortpanel'>" + c[b].Informasjon + "</div>";
          d += "</div>", $("#t3").append(d), $("#t3 ul li button").attr("style", "background-color:" + this.options.inactiveTabColor + ";display:block;");
          var e = this;
          $("#t3 ul li").bind("click", function() {
              $(".sortpanel").each(function() {
                  $(this).hide()
              }), $("#t3 ul li button").each(function() {
                  $(this).removeClass("active"), $(this).attr("style", "background-color:" + e.options.inactiveTabColor + ";display:block;")
              });
              var a = $(this).attr("id");
              $("#t3 ul li#" + a + " button").addClass("active"), $("#t3 ul li#" + a + " button").attr("style", "background-color:" + e.options.activeTabColor + ";display:block;"), e._tabIdArray.sorteringTabId = "s" + a, $("#sorts" + a).show()
          }), $("#t3 ul li button").hover(function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + e.options.onfocusColor + ";display:block;")
          }, function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + e.options.inactiveTabColor + ";display:block;")
          }), $(".hcontainer button").attr("style", "background-color:" + e.options.inactiveTabColor + ";"), $(".hcontainer button").bind("click", function() {
              var a = $(this).attr("id");
              return $(".sortpanel").each(function() {
                  $(this).hide(), $(".hcontainer button").attr("style", "background-color:" + e.options.inactiveTabColor + ";")
              }), $(".hcontainer button#" + a).hasClass("active") ? ($("#sort" + a).slideUp(1e3), $(".hcontainer button#" + a).removeClass("active"), $(".hcontainer button#" + a).addClass("t"), void $(".hcontainer button#" + a).attr("style", "background-color:" + e.options.inactiveTabColor + ";")) : ($(".hcontainer button").each(function() {
                  $(".hcontainer button").removeClass("active"), $(".hcontainer button").addClass("t"), $(this).attr("style", "background-color:" + e.options.inactiveTabColor + ";")
              }), $(".hcontainer  button:hover").attr("style", "background-color:" + e.options.onfocusColor + ";"), $(".hcontainer button#" + a).hasClass("t") ? ($("#sort" + a).slideDown(1e3), $(".hcontainer button#" + a).removeClass("t"), $(".hcontainer button#" + a).addClass("active"), $(".hcontainer button#" + a).attr("style", "background-color:" + e.options.activeTabColor + ";"), $("html, #renovation").animate({
                  scrollTop: $(".sortpanel").offset().top + $(".sortpanel").height() / 3
              }, 500), $(".sortpanel").each(function() {
                  $(this).hide()
              }), $("#t3 ul li button").each(function() {
                  $(this).removeClass("active"), $(this).attr("style", "background-color:" + e.options.inactiveTabColor + ";")
              }), e._tabIdArray.sorteringTabId = a, $("#t3 ul li#" + a.replace("s", "") + " button").addClass("active"), $("#t3 ul li#" + a.replace("s", "") + " button").attr("style", "background-color:" + e.options.activeTabColor + ";"), void $("#sorts" + a.replace("s", "")).show()) : void 0)
          }), $(".hcontainer  button ").hover(function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + e.options.onfocusColor + ";")
          }, function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + e.options.inactiveTabColor + ";")
          })
      }
  },
  _handleDeponierResponse: function(a) {
      if ($("#t4").empty(), "" !== a) {
          var b, c = JSON.parse(a),
              d = "<div style='display:block; width:100%;float: left;'><div style='height:100%; float: left' class='men'><ul style='list-style-type:none;'>";
          for (b = 0; b < c.length; b++) d += "<li style='text-decoration:none; border-top:0; margin-top:-1px;' class='depo' id='" + b + "'><button>" + c[b].Navn + "</button></li>";
          for (d += "</ul></div>", b = 0; b < c.length; b++) d += "<h1 class='hdepocontainer'><button  id='r" + b + "'>" + c[b].Navn + "</button></h1><div id ='depor" + b + "' style='float:left; display:none; margin-top:5px; margin-left:5px; width:50%;' class='depopanel'>" + c[b].Ã… pningstider + "</div>";
          d += "</div>", $("#t4").append(d), $("#t4 ul li button").attr("style", "background-color:" + this.options.inactiveTabColor + ";display:block;");
          var e = this,
              f = 0;
          if ($("#t4 ul li button").each(function() {
                  f++
              }), 1 == f) return $("#depor0").show(), $("#depo0").slideDown(1e3), $(".hdepocontainer").attr("style", "display:none;"), void $("#t4 ul").remove();
          $("#t4 ul li").bind("click", function() {
              $(".depopanel").each(function() {
                  $(this).hide()
              }), $("#t4 ul li button").each(function() {
                  $(this).removeClass("active"), $(this).attr("style", "background-color:" + e.options.inactiveTabColor + ";display:block;")
              });
              var a = $(this).attr("id");
              $("#t4 ul li#" + a + " button").addClass("active"), $("#t4 ul li#" + a + " button").attr("style", "background-color:" + e.options.activeTabColor + ";display:block;"), $("#depor" + a).show()
          }), $("#t4 ul li button").hover(function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + e.options.onfocusColor + "; display:block;")
          }, function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + e.options.inactiveTabColor + "; display:block;")
          }), $(".hdepocontainer button").attr("style", "background-color:" + e.options.inactiveTabColor + ";"), $(".hdepocontainer button").bind("click", function() {
              var a = $(this).attr("id");
              return $(".depopanel").each(function() {
                  $(this).hide(), $(".hdepocontainer button").attr("style", "background-color:" + e.options.inactiveTabColor + ";")
              }), $(".hdepocontainer button#" + a).hasClass("active") ? ($("#depo" + a).slideUp(1e3), $(".hdepocontainer button#" + a).removeClass("active"), $(".hdepocontainer button#" + a).addClass("t"), void $(".hdepocontainer button#" + a).attr("style", "background-color:" + e.options.inactiveTabColor + ";")) : ($(".hdepocontainer button").each(function() {
                  $(".hdepocontainer button").removeClass("active"), $(".hdepocontainer button").addClass("t"), $(this).attr("style", "background-color:" + e.options.inactiveTabColor + ";")
              }), $(".hdepocontainer  button:hover").attr("style", "background-color:" + e.options.onfocusColor + ";"), $(".hdepocontainer button#" + a).hasClass("t") ? ($("#depo" + a).slideDown(1e3), $(".hdepocontainer button#" + a).removeClass("t"), $(".hdepocontainer button#" + a).addClass("active"), void $(".hdepocontainer button#" + a).attr("style", "background-color:" + e.options.activeTabColor + ";")) : void 0)
          }), $(".hdepocontainer  button ").hover(function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + e.options.onfocusColor + ";")
          }, function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + e.options.inactiveTabColor + ";")
          })
      }
  },
  _generateInnbyggerMeldingUI: function(a) {
      var b = JSON.parse(a),
          c = document.createElement("div");
      c.style.display = "block", c.style.width = "99%";
      var d = document.createElement("div");
      d.style.height = "100%", d.className = "men";
      var e = document.createElement("ul");
      e.style.listStyleType = "none";
      var f, g, h = 0;
      for (f = 0; f < b.length; f++)
          for (g = 0; g < b[f].MessageTypes.length; g++) {
              var i = document.createElement("li");
              i.style.textDecoration = "none", i.style.borderTop = "0", i.style.marginTop = "-1px", i.className = "innbygger", i.id = f + "ident" + g;
              var j = document.createElement("button");
              j.textContent = b[f].MessageTypes[g].Name, i.appendChild(j), e.appendChild(i), h++
          }
      for (d.appendChild(e), c.appendChild(d), h = 0, f = 0; f < b.length; f++)
          for (g = 0; g < b[f].MessageTypes.length; g++) {
              var k = document.createElement("h1");
              k.className = "hinnbyggermelding";
              var l = document.createElement("button");
              l.id = "r" + f + "ident" + g, l.textContent = b[f].MessageTypes[g].Name, k.appendChild(l), c.appendChild(k);
              var m = document.createElement("div");
              m.id = "innbyggerr" + f + "ident" + g, m.style.display = "none", m.style.marginTop = "5px", m.style.marginLeft = "5px", m.style.width = "50%", m.className = "innbyggermeldingPanel";
              var n = document.createElement("label");
              n.textContent = "Beskrivelse (valgfritt):", n.setAttribute("for", "melding" + f + "ident" + g);
              var o = document.createElement("br"),
                  p = document.createElement("textarea");
              p.className = "textarea", p.rows = 10, p.id = "melding" + f + "ident" + g;
              var q = document.createElement("label");
              q.textContent = "Min e-post", q.style.display = "block", q.setAttribute("for", "innbyggerepost" + f + "ident" + g);
              var r = document.createElement("input");
              r.type = "text", r.id = "innbyggerepost" + f + "ident" + g, r.className = "innbyggerepost", r.style.display = "inline";
              var s = document.createElement("label");
              s.textContent = "", s.id = "emailErrorLabel" + f + "ident" + g, s.className = "errorLabel", r.oninput = function(a) {
                  var b = a.target.id.substr(a.target.id.length - 7),
                      c = document.getElementById("emailErrorLabel" + b),
                      d = document.getElementById("getimage" + b),
                      e = document.getElementById("innbyggerepost" + b);
                  RENOVATION.Utils.Validation.Email._emailValidation(e.value, c, d, e)
              }.bind(this), r.onkeydown = function(a) {
                  var b = a.target.id.substr(a.target.id.length - 7),
                      c = document.getElementById("emailErrorLabel" + b),
                      d = document.getElementById("getimage" + b),
                      e = document.getElementById("innbyggerepost" + b);
                  RENOVATION.Utils.Validation.Email._emailValidation(e.value, c, d, e)
              }.bind(this);
              var t = document.createElement("label");
              t.textContent = "Mitt telefonnummer", t.style.display = "block", t.setAttribute("for", "innbyggertlf" + f + "ident" + g);
              var u = document.createElement("input");
              u.type = "text", u.id = "innbyggertlf" + f + "ident" + g, u.className = "innbyggertlf", u.textContent = "Velg Bilde", u.style.display = "inline", u.type = "text";
              var v = document.createElement("label");
              v.textContent = "", v.id = "errorLabel" + f + "ident" + g, v.className = "errorLabel";
              var w = document.createElement("label");
              w.textContent = "Ta/legg ved Bilde (valgfritt)", w.className = "labelButton", w.id = "labelButton" + f + "ident" + g, w.style = "background-color:" + this.options.inactiveTabColor;
              var x = document.createElement("input");
              x.id = "getimage" + f + "ident" + g, x.type = "file", x.accept = "image/*", x.setCapture = "camera", x.visibility = "hidden";
              var y = document.createElement("label");
              y.textContent = "", y.id = "imageLabel" + f + "ident" + g, y.className = "imageLabel", y.style.display = "inline", u.onkeydown = function(a) {
                  var b = a.target.id.substr(a.target.id.length - 7),
                      c = document.getElementById("errorLabel" + b),
                      d = document.getElementById("getimage" + b),
                      e = document.getElementById("innbyggertlf" + b);
                  RENOVATION.Utils.Validation.PhoneNumber._mobilePhoneValidation(e.value, c, d, e)
              }.bind(this), u.oninput = function(a) {
                  var b = a.target.id.substr(a.target.id.length - 7),
                      c = document.getElementById("errorLabel" + b),
                      d = document.getElementById("getimage" + b),
                      e = document.getElementById("innbyggertlf" + b);
                  RENOVATION.Utils.Validation.PhoneNumber._mobilePhoneValidation(e.value, c, d, e)
              }.bind(this), x.onchange = function(a) {
                  var b = a.target.id.substr(a.target.id.length - 7);
                  RENOVATION.URL.REQUESTS._uploadImage(RENOVATION.URL.RenovationUrl.proxyServerLink() + "?server=https://innbyggermelding.no/api/media/upload", b, function(a) {
                      var b = JSON.parse(a.target.response);
                      A._picturePath = b[0].Url, A._picturePath = A._picturePath.replace(/^https:\/\//i, "https://")
                  })
              }.bind(this), w.appendChild(x);
              var z = document.createElement("button");
              z.className = "stdButton msg", z.id = "sendmessage" + f + "ident" + g, z.textContent = "Send melding", z.style = "background-color:" + this.options.inactiveTabColor;
              var A = this;
              z.onclick = function(a) {
                  var c = a.target.id.substr(a.target.id.length - 7),
                      d = c.split("ident")[0],
                      e = c.split("ident")[1],
                      f = document.getElementById("melding" + c).value,
                      g = document.getElementById("innbyggerepost" + c).value,
                      h = document.getElementById("innbyggertlf" + c).value;
                  if ("" == g && "" == h) return void RENOVATION.DOM._displayPopup("Vennligst legg inn e-post eller telefonnummer");
                  var i = RENOVATION.innbyggermelding._generateMessage(A._selectedMuniciplalityNumber, f, g, h, A._selectedBlob, A._picturePath, b[d].MessageTypes[e].Id, b[d].MessageTypes[e].CustomerId, this._selectedMuniciaplityName),
                      j = document.getElementById("innbyggerepost" + c),
                      k = document.getElementById("innbyggertlf" + c),
                      l = RENOVATION.Utils.Validation.Email._emailValidationAlone(j.value),
                      m = RENOVATION.Utils.Validation.PhoneNumber._mobilePhoneValidationAlone(k.value);
                  (l || m) && RENOVATION.URL.REQUESTS._sendInnbyggerMelding(i, A._selectedMuniciplalityNumber, function() {
                      RENOVATION.DOM._displayPopup("Meldingen er sendt. Takk for din henvendelse!"), document.getElementById("melding" + c).value = "", document.getElementById("innbyggerepost" + c).value = "", document.getElementById("innbyggertlf" + c).value = "", document.getElementById("errorLabel" + c).textContent = "", document.getElementById("emailErrorLabel" + c).textContent = "", document.getElementById("imageLabel" + c).textContent = "", j.style.borderColor = "black", A._picturePath = ""
                  })
              }.bind(this), m.appendChild(n), m.appendChild(o), m.appendChild(p), m.appendChild(o), m.appendChild(q), m.appendChild(o), m.appendChild(r), m.appendChild(s), m.appendChild(o), m.appendChild(t), m.appendChild(o), m.appendChild(u), m.appendChild(v), m.appendChild(o), m.appendChild(w), m.appendChild(y), m.appendChild(o), m.appendChild(z), c.appendChild(m), h++
          }
      return c
  },
  _handleInbbyggerMedling: function(a) {
      if (this.options.innbyggerMelding === !1) return void $(".wrapper h2#5 button").hide();
      if ($("#t5").empty(), null !== a || "" !== a) {
          var b = this._generateInnbyggerMeldingUI(a);
          null != b && this.options.innbyggerMelding === !0 && document.getElementById("t5").appendChild(b), $("#t5 ul li button").attr("style", "background-color:" + this.options.inactiveTabColor + ";");
          var c = this,
              d = 0;
          $("#t5 ul li button").each(function() {
              d++
          }), $("#t5 ul li").bind("click", function() {
              $(".innbyggermeldingPanel").each(function() {
                  $(this).hide()
              }), $("#t5 ul li button").each(function() {
                  $(this).removeClass("active"), $(this).attr("style", "background-color:" + c.options.inactiveTabColor + ";")
              });
              var a = $(this).attr("id");
              $("#t5 ul li#" + a + " button").addClass("active"), $("#t5 ul li#" + a + " button").attr("style", "background-color:" + c.options.activeTabColor + ";"), c._tabIdArray.meldingTabId = "r" + a, $("#innbyggerr" + a).css("display", "inline-table")
          }), $("#t5 ul li button").hover(function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + c.options.onfocusColor + ";display:block;")
          }, function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + c.options.inactiveTabColor + ";display:block;")
          }), $(".hinnbyggermelding button").attr("style", "background-color:" + c.options.inactiveTabColor + ";"), $(".hinnbyggermelding button").bind("click", function() {
              var a = $(this).attr("id");
              return $(".innbyggermeldingPanel").each(function() {
                  $(this).hide(), $(".hinnbyggermelding button").attr("style", "background-color:" + c.options.inactiveTabColor + ";")
              }), $(".hinnbyggermelding button#" + a).hasClass("active") ? ($("#innbygger" + a).slideUp(1e3), $(".hinnbyggermelding button#" + a).removeClass("active"), $(".hinnbyggermelding button#" + a).addClass("t"), void $(".hinnbyggermelding button#" + a).attr("style", "background-color:" + c.options.inactiveTabColor + ";")) : ($(".hinnbyggermelding button").each(function() {
                  $(".hinnbyggermelding button").removeClass("active"), $(".hinnbyggermelding button").addClass("t"), $(this).attr("style", "background-color:" + c.options.inactiveTabColor + ";")
              }), $(".hinnbyggermelding  button:hover").attr("style", "background-color:" + c.options.onfocusColor + ";"), $(".hinnbyggermelding button#" + a).hasClass("t") ? ($(".hinnbyggermelding button#" + a).removeClass("t"), $(".hinnbyggermelding button#" + a).addClass("active"), $(".hinnbyggermelding button#" + a).attr("style", "background-color:" + c.options.activeTabColor + ";"), $("html, #renovation").animate({
                  scrollTop: $(".innbyggermeldingPanel").offset().top + $(".innbyggermeldingPanel").height() / 3
              }, 500), $(".innbyggermeldingPanel").each(function() {
                  $(this).hide()
              }), $("#innbygger" + a).slideDown(1e3), $("#t5 ul li button").each(function() {
                  $(this).removeClass("active"), $(this).attr("style", "background-color:" + c.options.inactiveTabColor + ";")
              }), c._tabIdArray.meldingTabId = a.replace("r", ""), $("#t5 ul li#" + c._tabIdArray.meldingTabId + " button").addClass("active"), $("#t5 ul li#" + c._tabIdArray.meldingTabId + " button").attr("style", "background-color:" + c.options.activeTabColor + ";"), void $("#innbygger" + c._tabIdArray.meldingTabId).show()) : void 0)
          }), $(".hinnbyggermelding  button ").hover(function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + c.options.onfocusColor + ";")
          }, function() {
              $(this).hasClass("active") || $(this).attr("style", "background-color:" + c.options.inactiveTabColor + ";")
          })
      }
  },
  _initMap: function() {
      null != this._map && this._map.remove(), this._map = new window.WebatlasMap("map", {
          customer: "NorkartRenovasjonWeb"
      }), this._map.LayerControl.removeFrom(this._map), this._map.zoomControl.setPosition("bottomright");
      var a = window.L.control({
          position: "bottomleft"
      });
      a.onAdd = function() {
          var a = window.L.DomUtil.create("div", "Controls");
          return a.innerHTML = '<img src="https://' + RENOVATION.URL.RenovationUrl.hostServer() + '/Pictures/norkart_logo_positiv.png" style="width:100px; height:25px;"></img>', a
      }, a.addTo(this._map)
  },
  _handleReturPunkterResponse: function(a, b, c, d, e, f) {
      this.options.hideFourLastFans || this._initMap();
      var g, h, i = JSON.parse(a),
          j = JSON.parse(b),
          k = JSON.parse(c);
      this.Lat = g, this.Lon = h;
      try {
          this.options.hideFourLastFans || this._map.setView(new window.L.LatLng(i[1].Lat, i[1].Lon), null != this.options.zoomLevel ? this.options.zoomLevel : 14)
      } catch (l) {}
      for (var m, n = 0; n < k.length; n++) g = k[n].Lat, h = k[n].Lon, this.options.hideFourLastFans || (m = new window.L.Icon({
          iconUrl: "https://" + RENOVATION.URL.RenovationUrl.hostServer() + "/Pictures/mapicon_returpunkt1.png"
      }), window.L.marker([g, h], {
          icon: m
      }).bindPopup("<div style='color:black;'>" + k[n].Navn + ":<br/> - " + k[n].Plassering + "</div>").addTo(this._map));
      for (var n = 0; n < i.length; n++)
          for (var o = 0; o < i[n].Tommeinfo.length; o++)
              for (var p = 0; p < j.length; p++)
                  if (j[p].Id === i[n].Tommeinfo[o].FraksjonId)
                      if (g = i[n].Lat, h = i[n].Lon, this.options.hideFourLastFans || 1 != i[n].Tommeinfo.length) {
                          if (!this.options.hideFourLastFans) {
                              m = new window.L.Icon({
                                  iconUrl: "https://" + RENOVATION.URL.RenovationUrl.hostServer() + "/Pictures/mapicon_returpunkt1.png"
                              });
                              for (var q = "", r = 0; r < i[n].Tommeinfo.length; r++)
                                  for (var s = 0; s < j.length; s++) i[n].Tommeinfo[r].FraksjonId == j[s].Id && (q += " - " + j[s].Navn + "<br/>");
                              window.L.marker([g, h], {
                                  icon: m
                              }).bindPopup("<div style='color:black;'>" + i[n].Plassering + ":<br/> " + q + "</div>").addTo(this._map)
                          }
                      } else m = new window.L.Icon({
                          iconUrl: j[p].Ikon,
                          iconSize: [32, 32]
                      }), window.L.marker([g, h], {
                          icon: m
                      }).bindPopup("<div style='color:black;'>" + i[n].Plassering + ":<br/> - " + j[p].Navn + "</div>").addTo(this._map);
      if (!this.options.hideFourLastFans && void 0 !== d && void 0 !== e) {
          null != this._marker && this._map.removeLayer(this._marker), this._map.panTo(new window.L.LatLng(this._CoordinateArray[1], this._CoordinateArray[0]));
          var m = new window.L.Icon({
                  iconUrl: "https://" + RENOVATION.URL.RenovationUrl.hostServer() + "/Pictures/nk_021-punktmarkoer-Svart-skygge-80px.png",
                  iconSize: [32, 64]
              }),
              t = window.L.marker([d, e], {
                  icon: m
              }).bindPopup("<div style='color:black;'>" + f + "</div>").addTo(this._map);
          self._marker = t
      }
  },
  _createSmsCpt: function(a, b, c, d) {
      var e = document.createElement("div");
      e.id = "sms-div", e.style.fontSize = this.options.fontSize;
      var f = document.createElement("label");
      f.textContent = "Bestill varsel pÃ¥ SMS", f.setAttribute("for", "sms-input");
      var g = document.createElement("label");
      g.textContent = "", g.id = "smsLabel";
      var h = document.createElement("input");
      h.type = "text", h.fontSize = this.options.fontSize, h.className = "sms-textbox", h.placeholder = " Ditt mobilnummer...", h.id = "sms-input", h.onclick = function() {
          this.value = "", g.textContent = ""
      };
      var i = document.createElement("button");
      i.disabled = !0, i.className = "sms-button", i.style.backgroundColor = this.options.inactiveTabColor, i.textContent = "Bestill", h.onkeydown = function() {
          RENOVATION.Utils.Validation.PhoneNumber._mobilePhoneValidation(h.value, g, i, h)
      }.bind(this), h.oninput = function() {
          RENOVATION.Utils.Validation.PhoneNumber._mobilePhoneValidation(h.value, g, i, h)
      }.bind(this), i.onclick = function() {
          RENOVATION.Utils.Validation.PhoneNumber._mobilePhoneValidation(h.value, g, i, h) && ((this._searchAddress || "" != b) && RENOVATION.URL.REQUESTS._makeSmsRequest(h.value, (new Date).toLocaleTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"), b, !1, d, this._selectedMuniciplalityNumber, function(a) {
              "true" == a ? (g.textContent = "Bestillingen pÃ¥ SMS-varsel er sendt. Som bekreftelse vil du nÃ¥ motta en SMS pÃ¥ det angitte mobilnummeret. Tjenesten er gratis.", g.style.color = "green") : 0 == a || (g.style.color = "red", g.textContent = "Skriv nummeret pÃ¥ nytt")
          }), this._searchAddress && "" == c || RENOVATION.URL.REQUESTS._makeSmsRequest(h.value, (new Date).toLocaleTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"), c.split(" ")[0], !0, d, this._selectedMuniciplalityNumber, function(a) {
              "true" == a ? (g.textContent = "Bestillingen pÃ¥ SMS-varsel er sendt. Som bekreftelse vil du nÃ¥ motta en SMS pÃ¥ det angitte mobilnummeret. Tjenesten er gratis.", g.style.color = "green") : 0 == a || (g.style.color = "red", g.textContent = "Skriv nummeret pÃ¥ nytt")
          }))
      }.bind(this);
      var j = document.createElement("div");
      j.className = "sms-checkboxes";
      for (var k = 0; k < a.length; k++) {
          var l = document.createElement("label");
          l.textContent = a[k];
          var m = document.createElement("input");
          m.id = "smsCheckbox" + k, m.style.display = "none", l.style.display = "none", m.type = "checkbox", m.checked = !0, j.appendChild(m), j.appendChild(l)
      }
      return e.appendChild(f), e.appendChild(g), e.appendChild(h), e.appendChild(i), e.appendChild(j), e.appendChild(g), e
  },
  _createCalendar: function(a, b, c) {
      RENOVATION.Behavior._initTabsOnDocumentready(1, this.options, this._tabIdArray.mainTabId), $("#help").attr("style", "display:none;"), $("#calendar .cal").remove(), $("#pElemAddress span").remove(), $("#label span").remove(), $("#labellink span").remove(), $("#label span span").remove(), $("#sms-div").remove(), $("#pElemAddress").append("<span class='tomme' style='font-weight:bold;'>" + this._selectedBlob + "</span>");
      var d, e = this._selectedBlob.split(" "),
          f = "";
      for (d = 0; d < e.length - 1; d++) f += e[d] + " ";
      if ("[]" == b) {
          var g = "<span>Det er ikke knyttet hentedager til din adresse, ta kontakt med oss for Ã¥ fÃ¥ dine hentedager. Du kan ikke bestille SMS hvis du ikke har hentedager knyttet til din adresse.</span>",
              h = "<span>Det er ikke knyttet hentedager til din adresse, ta kontakt med oss for Ã¥ fÃ¥ dine hentedager.</span>";
          return $("#label").append(RENOVATION.License._isSms ? g : h), void(RENOVATION.License._isSms && ($("#t1").append(this._createSmsCpt("", f, this._selectedBlob)), $(".sms-textbox").prop("disabled", !0)))
      }
      $("#label").append("<span>Dine neste hentedager er:</span>");
      var i = 0,
          j = [],
          k = [];
      try {
          var l = JSON.parse(a),
              m = JSON.parse(b),
              n = "";
          for (d = 0; d < l.length; d++)
              for (var o = 0; o < m.length; o++) l[d].Id === m[o].FraksjonId && (j[i] = l[d].Navn, k[i] = l[d].Id, i++, n += '<div style="width:' + (1 / m.length * 100 - .3) + '%;" class ="cal">', n += "<ul><li><img  class ='ikon' src='" + l[d].Ikon + "'</img></li>", n += "<li style='font-weight:bold; font-family:'" + this.options.fontFamily + ";color:" + this.options.fontColor + ";font-family:" + this.options.fontFamily + ";'>" + l[d].Navn + "</li>", n += "<li><table><tr><td>" + RENOVATION.Utils.Date._FormatStringDate(RENOVATION.Utils.Date._convertDateToString(m[o].Tommedatoer)[0]) + "</td></tr><tr><td>" + RENOVATION.Utils.Date._FormatStringDate(RENOVATION.Utils.Date._convertDateToString(m[o].Tommedatoer)[1]) + " </td></tr></table></li></ul>", n += "</div>");
          $("#calendar").append(n);
          var p = this,
              q = navigator.userAgent.toLowerCase(),
              r = q.indexOf("android") > -1;
          if (-1 === this._selectedBlob.indexOf("/")) {
              var s = c,
                  t = RENOVATION.Utils.Validation.Adress._extractGatenavnfromAdress(s),
                  u = RENOVATION.Utils.Validation.Adress._extractHusNrFromGatenavn(s);
              r ? RENOVATION.URL.RenovationUrl._sendAsyncRequest(this._buildKomtekSkyLink() + "/api/tommekalenderPdf/?", "gatenavn=" + t + "&gatekode=" + this._gateKode + "&husnr=" + u + "&aar=" + (new Date).getFullYear(), function(a) {
                  $("#labellink").append('<span><a  href="' + a + '" rel="noopener"  style="font-family:' + p.options.fontFamily + ";color:" + p.options.fontColor + ';display:block;" >Se tÃ¸mmedager for hele Ã¥ret</a></span>')
              }, {
                  contentType: "application/pdf",
                  selectedMuniciplalityNumber: p._selectedMuniciplalityNumber,
                  isHeaders: !0
              }) : RENOVATION.URL.RenovationUrl._sendAsyncRequest(this._buildKomtekSkyLink() + "/api/tommekalenderPdf/?", "gatenavn=" + t + "&gatekode=" + this._gateKode + "&husnr=" + u + "&aar=" + (new Date).getFullYear(), function(a) {
                  $("#labellink").append('<span><a target="_blank" rel="noopener"  href="' + a + '"  style="font-family:' + p.options.fontFamily + ";color:" + p.options.fontColor + ';" >Se tÃ¸mmedager for hele Ã¥ret</a></span>')
              }, {
                  contentType: "application/pdf",
                  selectedMuniciplalityNumber: p._selectedMuniciplalityNumber,
                  isHeaders: !0
              })
          } else r ? RENOVATION.URL.RenovationUrl._sendAsyncRequest(this._buildKomtekSkyLink() + "/api/tommekalenderPdf/?", "eiendomString=" + this._selectedBlob.split(" ")[0] + "&aar=" + (new Date).getFullYear(), function(a) {
              $("#labellink").append('<span><a  target="_blank" rel="noopener"  href="' + a + '"  style="font-family:' + p.options.fontFamily + ";color:" + p.options.fontColor + ';" >Se tÃ¸mmedager for hele Ã¥ret</a></span>')
          }, {
              contentType: "application/pdf",
              selectedMuniciplalityNumber: p._selectedMuniciplalityNumber,
              isHeaders: !0
          }) : RENOVATION.URL.RenovationUrl._sendAsyncRequest(this._buildKomtekSkyLink() + "/api/tommekalenderPdf/?", "eiendomString=" + this._selectedBlob.split(" ")[0] + "&aar=" + (new Date).getFullYear(), function(a) {
              $("#labellink").append('<span><a target="_blank" rel="noopener"  href="' + a + '"  style="font-family:' + p.options.fontFamily + ";color:" + p.options.fontColor + ';" >Se tÃ¸mmedager for hele Ã¥ret</a></span>')
          }, {
              contentType: "application/pdf",
              selectedMuniciplalityNumber: p._selectedMuniciplalityNumber,
              isHeaders: !0
          });
          RENOVATION.License._isSms && $("#t1").append(p._createSmsCpt(j, f, this._selectedBlob, k))
      } catch (v) {
          $("#calendar > tbody:last").append("<tr class='tomme'><td style='font-weight:bold;'>Det er ikke knyttet hentedager til din adresse, ta kontakt med oss for Ã¥ fÃ¥ dine hentedager.</td></tr>"), RENOVATION.License._isSms && $("#t1").append(p._createSmsCpt("", f, this._selectedBlob, ""))
      }
  },
  _createMainMenu: function() {
      "none" != $(".tabs ul li#5 button").css("display") || RENOVATION.License._isMelding || $(".wrapper h2#5 button").hide();
      var a = this;
      $(".t").bind("click", function() {
          $(".panel").each(function() {
              $(this).hide()
          }), $(".tabs ul li button").each(function() {
              $(".tabs ul li button").removeClass("active"), $(".tabs ul li button").addClass("t"), $(this).attr("style", "background-color:" + a.options.inactiveTabColor + ";")
          }), $(".tabs ul li button:hover").attr("style", "background-color:" + a.options.onfocusColor + ";");
          var b = $(this).attr("id");
          $("#t" + b).show(), $(".tabs ul li#" + b + " button").removeClass("t"), $(".tabs ul li#" + b + " button").addClass("active"), $(".tabs ul li#" + b + " button").attr("style", "background-color:" + a.options.activeTabColor + ";"), a._tabIdArray.mainTabId = b, RENOVATION.DOM._toggleAvviksmeldingerShowHide(a.options)
      }), $(".tabs ul li button").hover(function() {
          $(this).hasClass("active") || $(this).attr("style", "background-color:" + a.options.onfocusColor + ";")
      }, function() {
          $(this).hasClass("active") || $(this).attr("style", "background-color:" + a.options.inactiveTabColor + ";")
      }), $(".wrapper h2").bind("click", function() {
          var b = $(this).attr("id");
          return $(".panel").each(function() {
              $(this).hide()
          }), $(".wrapper h2#" + b + " button").hasClass("active") ? ($(".wrapper h2#" + b + " button").removeClass("active"), $(".wrapper h2#" + b + " button").addClass("t"), $(".wrapper h2#" + b + " button").attr("style", "background-color:" + a.options.inactiveTabColor + ";"), $("#t" + b).slideUp(1e3), void("none" != $(".tabs ul li#5 button").css("display") || RENOVATION.License._isSms || $(".wrapper h2#5 button").hide())) : ($(".wrapper h2 button").each(function() {
              $(".wrapper h2 button").removeClass("active"), $(".wrapper h2 button").addClass("t"), $(this).attr("style", "background-color:" + a.options.inactiveTabColor + ";")
          }), $(".wrapper h2 button:hover").attr("style", "background-color:" + a.options.onfocusColor + ";"), $(".wrapper h2#" + b + " button").hasClass("t") ? ($("#t" + b).slideDown(1e3), $(".wrapper h2#" + b + " button").removeClass("t"), $(".wrapper h2#" + b + " button").addClass("active"), $(".wrapper h2#" + b + " button").attr("style", "background-color:" + a.options.activeTabColor + ";"), $(".tabs ul li button").each(function() {
              $(".tabs ul li button").removeClass("active"), $(".tabs ul li button").addClass("t"), $(this).attr("style", "background-color:" + a.options.inactiveTabColor + ";")
          }), a._tabIdArray.mainTabId = b, $(".tabs ul li#" + b + " button").removeClass("t"), $(".tabs ul li#" + b + " button").addClass("active"), $(".tabs ul li#" + b + " button").attr("style", "background-color:" + a.options.activeTabColor + ";"), RENOVATION.DOM._toggleAvviksmeldingerShowHide(a.options), void("none" != $(".tabs ul li#5 button").css("display") || RENOVATION.License._isSms || $(".wrapper h2#5 button").hide())) : void 0)
      }), $(".wrapper h2 button ").hover(function() {
          $(this).hasClass("active") || $(this).attr("style", "background-color:" + a.options.onfocusColor + ";")
      }, function() {
          $(this).hasClass("active") || $(this).attr("style", "background-color:" + a.options.inactiveTabColor + ";")
      })
  },
  _makeOptionMenuAndFilter: function() {
      for (var a = this, b = 0; b < a._municipalityData.length; b++)
          for (var c = 0; c < a.options.kommunenummere.length; c++)
              if (a._municipalityData[b].Number == a.options.kommunenummere[c]) {
                  var d = document.createElement("option");
                  d.value = a._municipalityData[b].Number, d.innerHTML = "<img src='" + a._municipalityData[b].Logo + "' width='16' height='16'></img><span>" + a._municipalityData[b].Name + "</span>", a._selectElement.append(d)
              }
  },
  _makeOptionMenu: function() {
      for (var a = this, b = 0; b < a._municipalityData.length; b++) {
          var c = document.createElement("option");
          c.value = a._municipalityData[b].Number, c.innerHTML = "<div><img src='" + a._municipalityData[b].Logo + "' width='16' height='16'></img><span>" + a._municipalityData[b].Name + "</span></div>", a._selectElement.append(c)
      }
  },
  _getMunicipalityLogo: function(a) {
      for (var b = 0; b < this._municipalityData.length; b++)
          if (a == this._municipalityData[b].Number) return void(this._municipalityIconUrl = this._municipalityData[b].Logo)
  },
  _getMunicipalityName: function(a) {
      for (var b = 0; b < this._municipalityData.length; b++)
          if (a === this._municipalityData[b].Number) return this._selectedMuniciaplityName = this._municipalityData[b].Name, void(RENOVATION._selectedMuniciaplityName = this._selectedMuniciaplityName)
  },
  _getMunicipalityNumber: function(a) {
      for (var b = 0; b < this._municipalityData.length; b++) a.toUpperCase() == this._municipalityData[b].Name.toUpperCase() && (this._selectedMuniciplalityNumber = this._municipalityData[b].Number)
  },
  _setSorteringsInfoAndReturPunkt: function(a, b, c, d, e) {
      var f = "";
      this._selectedMuniciaplityName = a;
      for (var g = 0; g < this._municipalityData.length; g++) {
          var h = this._municipalityData[g].Name.toUpperCase();
          a.toUpperCase() === h && (this._municipalityIconUrl = this._municipalityData[g].Logo, b = this._municipalityData[g].Number, this._selectedMuniciplalityNumber = b, f = this._mainUrl.getCapabilitiesLink)
      }
      var i = this;
      RENOVATION.URL.RenovationUrl._getKomtekSkyURL(f, function(a) {
          RENOVATION.URL.RESPONSE._handleKontekSkyUrlResponse(a), RENOVATION.URL.RenovationUrl._getAppendix(i._selectedMuniciplalityNumber, function(a) {
              RENOVATION.URL.RESPONSE._handleAppendixResponse(a, i.options), RENOVATION.URL.RenovationUrl._getSorteringsInfo(i._selectedMuniciplalityNumber, function(a) {
                  i._handleSorteringResponse(a)
              }), RENOVATION.URL.RenovationUrl._getDeponier(i._selectedMuniciplalityNumber, function(a) {
                  i._handleDeponierResponse(a), i._getFraskjoner(function(b) {
                      i._fraskjonResponse = b, i._getAllReturPunkter(function(b) {
                          i._handleReturPunkterResponse(b, i._fraskjonResponse, a, c, d, e)
                      })
                  })
              })
          })
      })
  },
  _initHTMLElement: function() {
      this._searchElement = $("#search"), RENOVATION.Behavior._initTabsOnDocumentready(2, this.options, this._tabIdArray.mainTabId), RENOVATION.URL.RenovationUrl._getMunicipalities(function(a) {
          for (var b = 0; b < JSON.parse(a).length; b++) this._municipalityData[b] = JSON.parse(a)[b];
          this._getMunicipalityName(this.options.kommunenummere[0]);
          for (var c = this._mainUrl.getCapabilitiesLink, b = 0; b < this._municipalityData.length; b++) this._selectedMuniciaplityName === this._municipalityData[b].Name && (this._municipalityIconUrl = this._municipalityData[b].Logo, this._selectedMuniciplalityNumber = this._municipalityData[b].Number);
          var d = this;
          RENOVATION.URL.RenovationUrl._getKomtekSkyURL(c, function(a) {
              RENOVATION.URL.RESPONSE._handleKontekSkyUrlResponse(a), RENOVATION.URL.RenovationUrl._getAppendix(d._selectedMuniciplalityNumber, function(a) {
                  RENOVATION.URL.RESPONSE._handleAppendixResponse(a, d.options), RENOVATION.URL.RenovationUrl._getSorteringsInfo(d._selectedMuniciplalityNumber, function(a) {
                      d._handleSorteringResponse(a), RENOVATION.URL.RenovationUrl._getDeponier(d._selectedMuniciplalityNumber, function(a) {
                          d._handleDeponierResponse(a), d._getFraskjoner(function(b) {
                              d._getAllReturPunkter(function(c) {
                                  d._handleReturPunkterResponse(c, b, a)
                              })
                          })
                      })
                  })
              })
          })
      }.bind(this)), this._changeOptionSetting()
  },
  _changeOptionSetting: function() {
      this.options.kommunenummere.length > 1 && this.options.kommunesamarbeid === !0 ? this._makeOptionMenuAndFilter() : 1 === this.options.kommunenummere.length && this.options.kommunesamarbeid === !1 ? this._makeOptionMenuAndFilter() : this._makeOptionMenu(), $(window).resize()
  },
  _searchAutocomplete: function() {
      var a = this;
      $.ui.autocomplete.filter = function(a, b) {
          var c = new RegExp("^" + $.ui.autocomplete.escapeRegex(b), "i");
          return $.grep(a, function(a) {
              return c.test(a.label || a.value || a)
          })
      }, $("#search").autocomplete({
          delay: 0,
          minLength: 0,
          selectFirst: !0,
          autoFill: !0,
          cacheLength: 1,
          response: function(b, c) {
              0 === c.content.length && a._searchElement.val().length >= 4 ? $("#searchAlert").text("Beklager, ingen treff!") : $("#searchAlert").empty()
          },
          source: function(b, c) {
              if (a.term !== b.term)
                  for (var d = 0, e = 0; e < a.options.kommunenummere.length; e++) {
                      var f = RENOVATION.URL.RenovationUrl._buildSearchAddressLink(b.term, a.options.kommunenummere[e], 0);
                      $.getJSON(f, function(e) {
                          $.each(e, function(b, c) {
                              for (var e = c.Roads.length, f = 0; e > f; f++)
                                  for (var g = c.Roads[f].Addresses.length, h = 0; g > h; h++) a._roadNo[d] = c.Roads[f].Id, -1 === c.Roads[f].RoadName.indexOf("/") && -1 === c.Roads[f].Addresses[h].House.indexOf("/") ? (a._autocompleteAddresses[d] = c.Roads[f].RoadName + " " + c.Roads[f].Addresses[h].House + " " + c.Roads[f].MunicipalityName, a._autocompleteAddressesPure[d] = c.Roads[f].RoadName + " " + c.Roads[f].Addresses[h].House, a._autoCompleteMunicipalityName[d] = c.Roads[f].MunicipalityName, a._autoCompleteMunicipalityNo[d] = c.Roads[f].MunicipalityNo, a._autoCompleteCoordinates[d] = {
                                      x: c.Roads[f].Addresses[h].Coordinate.Y,
                                      y: c.Roads[f].Addresses[h].Coordinate.X
                                  }) : (a._autocompleteAddresses[d] = c.Roads[f].Addresses[h].House + " " + c.Roads[f].MunicipalityName, a._autoCompleteMunicipalityName[d] = c.Roads[f].MunicipalityName, a._autoCompleteMunicipalityNo[d] = c.Roads[f].MunicipalityNo, a._autoCompleteCoordinates[d] = {
                                      x: c.Roads[f].Addresses[h].Coordinate.Y,
                                      y: c.Roads[f].Addresses[h].Coordinate.X
                                  }), d++
                          });
                          var f;
                          f = void 0 !== $.ui ? $.ui.autocomplete.filter(a._autocompleteAddresses, b.term) : a._autocompleteAddresses;
                          var g = RENOVATION.Extention.unique(f),
                              h = $.map(g, function(a) {
                                  return 0 === a.toUpperCase().indexOf(b.term.toUpperCase()) ? a : void 0
                              });
                          c(h.length <= 10 ? h : h.slice(0, 10))
                      })
                  }
          },
          select: function(b, c) {
              $("#spinner").show(), $("#overlay").fadeIn(300), $("#renovation").animate({
                  opcacity: 0
              }, {
                  duration: 800,
                  complete: function() {
                      a._selectedBlob = c.item.label;
                      for (var b = 0, d = 0; d < a._autocompleteAddresses.length; d++)
                          if (a._autocompleteAddresses[d] === c.item.label) {
                              b = d;
                              break
                          } this._blobArray = a._selectedBlob.split(" "), a._CoordinateArray[1] = a._autoCompleteCoordinates[b].y, a._CoordinateArray[0] = a._autoCompleteCoordinates[b].x;
                      var e = a._autoCompleteMunicipalityNo[b],
                          f = a._autoCompleteMunicipalityName[b],
                          g = a._autocompleteAddressesPure[b],
                          h = this._blobArray.length,
                          i = "",
                          j = RENOVATION.Utils.Validation.Adress._extractHusNrFromGatenavn(g),
                          k = function(b) {
                              i = b, RENOVATION.URL.RenovationUrl._getAppendix(a._selectedMuniciplalityNumber, function(b) {
                                  RENOVATION.URL.RESPONSE._handleAppendixResponse(b, a.options), a._getFraskjoner(function(b) {
                                      a._fraskjonResponse = b, a._createCalendar(a._fraskjonResponse, i, g)
                                  })
                              }), a.options.innbyggerMelding && RENOVATION.URL.REQUESTS._getCategory(a._selectedMuniciplalityNumber, function(b) {
                                  a._handleInbbyggerMedling(b)
                              }), -1 !== this._blobArray[0].indexOf("/") ? isNaN(parseInt(this._blobArray[h - 2])) ? a._setSorteringsInfoAndReturPunkt(f, a._selectedMuniciplalityNumber, a._CoordinateArray[1], a._CoordinateArray[0], c.item.label) : a._setSorteringsInfoAndReturPunkt(f, a._selectedMuniciplalityNumber, a._CoordinateArray[1], a._CoordinateArray[0], c.item.label) : isNaN(parseInt(this._blobArray[h - 2])) ? a._setSorteringsInfoAndReturPunkt(f, a._selectedMuniciplalityNumber, a._CoordinateArray[1], a._CoordinateArray[0], c.item.label) : a._setSorteringsInfoAndReturPunkt(f, a._selectedMuniciplalityNumber, a._CoordinateArray[1], a._CoordinateArray[0], c.item.label), $("#spinner").hide(), $("#overlay").fadeOut(0), $("#adresse").focus(), $("#search").blur(), $(this).data().term = null, a._autocompleteAddresses = [], a._autoCompleteCoordinates = [], $("#search").data().term = null
                          }; - 1 !== this._blobArray[0].indexOf("/") ? (a._getMunicipalityNumber(this._blobArray[1]), e = a._selectedMuniciplalityNumber, a._getTommeKalender(e, null, null, null, this._blobArray[0].split(" "), null, null, k.bind(this))) : (a._selectedMuniciplalityNumber = e, i = a._getTommeKalender(e, g, a._roadNo[b], j, null, null, null, k.bind(this)))
                  }
              })
          }
      })
  },
  execute: function() {
      var a = this;
      ! function() {
          RENOVATION.URL.ScriptLoader._loadScript("https://code.jquery.com/jquery-1.10.2.min.js", function() {
              "undefined" == typeof window.jQuery ? (RENOVATION.APP._redirectToApp(), RENOVATION.URL.HeaderScript._placeHeaderScripts(), a._createRenovationElement(), a._createMainMenu(), RENOVATION.DOM._initSelectElement(a.options), a._initHTMLElement(), RENOVATION.DOM._responsiveResizing(a.options), a._searchAutocomplete()) : RENOVATION.URL.ScriptLoader._loadScript("https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js", function() {
                  $.getScript("https://www.webatlas.no/sh/3/v/101014/webatlas.js", function() {
                      RENOVATION.APP._redirectToApp(), RENOVATION.URL.HeaderScript._placeHeaderScripts(), a._createRenovationElement(), a._createMainMenu(), RENOVATION.DOM._initSelectElement(a.options), a._initHTMLElement(), RENOVATION.DOM._responsiveResizing(a.options), a._searchAutocomplete()
                  })
              })
          })
      }(), window.onclick = function() {
          a.options.hideFourLastFans || a._map.invalidateSize(!1)
      }, $(window).resize(function() {
          var b = window.innerWidth > 0 ? window.innerWidth : screen.width;
          b > 120 && 600 >= b ? $(".wrapper").attr("style", "background-color:" + a.options.backgroundColor + "; border-color:" + a.options.backgroundColor + ";") : ($(".wrapper").attr("style", "background-color:" + a.options.backgroundColor + "; border-color:" + a.options.backgroundColor + ";min-height:" + a.options.height + "px;"), void 0 != document.getElementById("map") && (document.getElementById("map").style.height = a.options.height + "px")), void 0 == a._map || a.options.hideFourLastFans || a._map.invalidateSize(!1), void 0 != a._map && a._map.zoomControl.setPosition("bottomright"), $(".table").width($(this).width() / 4), $(".wrapper h2 button").each(function() {
              $(".wrapper h2 button").removeClass("active"), $(".wrapper h2 button").addClass("t"), $(this).attr("style", "background-color:" + a.options.inactiveTabColor + ";")
          }), $(".wrapper h2#" + a._tabIdArray.mainTabId + " button").removeClass("t"), $(".wrapper h2#" + a._tabIdArray.mainTabId + " button").addClass("active"), $(".wrapper h2#" + a._tabIdArray.mainTabId + " button").attr("style", "background-color:" + a.options.activeTabColor + ";"), $(".hcontainer button").each(function() {
              $(".hcontainer button").removeClass("active"), $(".hcontainer button").addClass("t"), $(this).attr("style", "background-color:" + a.options.inactiveTabColor + ";")
          }), null != a._tabIdArray.sorteringTabId && ($(".hcontainer button#" + a._tabIdArray.sorteringTabId).removeClass("t"), $(".hcontainer button#" + a._tabIdArray.sorteringTabId).addClass("active"), $(".hcontainer button#" + a._tabIdArray.sorteringTabId).attr("style", "background-color:" + a.options.activeTabColor + ";")), $(".hinnbyggermelding button").each(function() {
              $(".hinnbyggermelding button").removeClass("active"), $(".hinnbyggermelding button").addClass("t"), $(this).attr("style", "background-color:" + a.options.inactiveTabColor + ";")
          }), null != a._tabIdArray.meldingTabId && ($(".hinnbyggermelding button#" + a._tabIdArray.meldingTabId).removeClass("t"), $(".hinnbyggermelding button#" + a._tabIdArray.meldingTabId).addClass("active"), $(".hinnbyggermelding button#" + a._tabIdArray.meldingTabId).attr("style", "background-color:" + a.options.activeTabColor + ";"), $("#innbyggerr" + a._tabIdArray.meldingTabId).css("display", "inline-table")), "none" != $(".tabs ul li#5 button").css("display") || a.options.innbyggerMelding || $(".wrapper h2#5 button").hide()
      }), $(document).ready(function() {
          $.ajaxSetup({
              cache: !1
          })
      })
  }
};