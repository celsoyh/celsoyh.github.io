function rntValidaCPF() {
  var cpfValue = document.getElementById('rnt_companion_cpf').value;
  var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
  if (cpfValido.test(cpfValue) == false) {
    cpfValue = cpfValue.replace(/\D/g, '');

    if (cpfValue.length == 11) {
      cpfValue = cpfValue.replace(/(\d{3})(\d)/, '$1.$2');
      cpfValue = cpfValue.replace(/(\d{3})(\d)/, '$1.$2');
      cpfValue = cpfValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      var valorValido = (document.getElementById(
        'rnt_companion_cpf'
      ).value = cpfValue);
    }
  }
}

function rntMobileMask(phoneInput) {
  let formatedNumber = phoneInput.value.replace(/[- )()]/g, '');

  const dddNumber = formatedNumber.slice(0, 2);
  const firstNumbers = formatedNumber.slice(2, 7);
  const lastNumbers = formatedNumber.slice(7, 11);
  formatedNumber = `(${dddNumber}) ${firstNumbers}-${lastNumbers}`;

  phoneInput.value = formatedNumber;
}

function rntOnFormSubmit() {
  const formElement = document.getElementsByClassName('formContainer_body-form')[0];
  const successMsg = document.getElementById('successMsg');
  const errorMsg = document.getElementById('errorMsg');
  const submitBtn = document.getElementById('rnt_companionForm-send');
  const submitBtnWPP = document.getElementById('rnt_companionForm-wpp');

  submitBtnWPP.addEventListener('click', function(e) {
    e.preventDefault();
       
    function initFreshChat() {
      window.fcWidget.init({
        token: "8774d419-0104-43af-93cd-fbf3130ab5a6",
        host: "https://wchat.freshchat.com"
      });

      window.fcWidget.user.setProperties({
        firstName: document.getElementById('rnt_companion_nome').value,
        lastName: '',
        phone: document.getElementById('rnt_companion_phone').value,
        email: "teste@gmail.com",
        meta: {
          cpf: document.getElementById('rnt_companion_cpf').value,
        }
      }).then(function(success) {
        console.log(success)
        setTimeout(function () {
          const companionFormComponent = document.getElementById('rnt_companionForm');
          companionFormComponent.classList.remove('active');
          companionFormComponent.classList.remove('overflow');
        }, 500);

        setTimeout(function() {
          window.fcWidget.open();
        }, 1500)
      })
    }
    function initialize(i,t){var e;i.getElementById(t)?initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,e.src="https://wchat.freshchat.com/js/widget.js",e.onload=initFreshChat,i.head.appendChild(e))}function initiateCall(){initialize(document,"freshchat-js-sdk")}window.addEventListener?initiateCall():initiateCall();

  })

  formElement.addEventListener('submit', function (e) {
    e.preventDefault();
    submitBtn.setAttribute('disabled', true);

    var elements = document.getElementsByClassName("rntFormVal");
    var formData = {
      "type": "easy-contact",
      "internetSupport": null,
      "internetProtocol": null,
      "termOfUseOfPersonalData": true,
      "sourcePlatform": location.host.includes('ofertas') ? "offers site" : "store site"
    };

    for (var i = 0; i < elements.length; i++) {
      formData[elements[i].name] = elements[i].value;
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        formElement.classList.add('hide');
        successMsg.classList.add('active');
        document.querySelector('.formContainer_body p').classList.add('hide')
        errorMsg.classList.remove('active');
        errorMsg.innerText = '';

        setTimeout(function () {
          const companionFormComponent = document.getElementById('rnt_companionForm');
          companionFormComponent.classList.remove('active');
          companionFormComponent.classList.remove('overflow');
        }, 4000);

        dataLayer.push({
          'event': 'interaction',
          'category': 'Leadform Validations',
          'action': 'Estou interessado ',
          'label': formData.model
        }, {
          'event': 'interaction',
          'category': 'Entre em contato',
          'action': 'Contato enviado ',
          'label': formData.model
        })
      } else {
        let errMsg = JSON.parse(xmlHttp.response);
        errorMsg.innerText = errMsg.message;
        errorMsg.classList.add('active');
        submitBtn.removeAttribute('disabled');

        setTimeout(function () {
          errorMsg.classList.remove('active');
        }, 4000)
      }
    }

    xmlHttp.open("post", "https://service.renault.com.br/dispatcher/stance/lead");
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(formData));
  })
}

window.onload = function () {
  const formContainerStyleTag = document.createElement('style');
  const formContainer = document.createElement('div');
  const scriptFormTag = document.getElementById('rntScriptForm');
  const isProductPage = scriptFormTag.getAttribute('data-productpage');
  formContainer.id = 'rnt_companionForm';
  
  const formContainerStyles = "#rnt_companionForm {"+
      "font-family: 'renault_liferegular', Arial, sans-serif; "+ 
    "} "+ 
    "#rnt_companionForm .formContainer {"+
      "background:#ffcc33;"+
      "padding: 10px 0 10px 0;"+
      "max-width: 235px;"+
      "position: fixed;" +
      "top:" + (isProductPage ? "12%;" : "21%;") +
      "right: 10px;" +
      "z-index: 9999;"+
      "box-shadow: 0px 0px 25px rgba(0,0,0,0.2);"+
      "transition: all .3s ease-in-out;"+
    "}"+

    "#rnt_companionForm.active .formContainer {"+
      "max-width: 405px;"+
      "width: 95%;"+
      "padding: 20px 0 15px 0;"+
      "top: 1%;"+
    "}"+

    "#rnt_companionForm .formContainer_header {"+
      "display: flex;"+
      "padding: 0 5px 0 30px;"+
      "align-items: center;"+
      "cursor: pointer;"+
    "}"+

    "#rnt_companionForm .formContainer_header i {"+
      "margin-left:auto;"+
    "}"+

    "#rnt_companionForm .formContainer_header p {"+
      "margin: 0;"+
      "font-family: renault_lifebold, sans-serif;"+
      "color: #000;"+
      "font-size: 14px;"+
      "text-transform: uppercase;"+
      "display: flex; "+
      "letter-spacing: initial;"+
      "align-items: center;"+
      "transition: all .3s ease-in-out;"+
    "}"+

    "@media screen and (max-width: 480px) {"+
      "#rnt_companionForm .formContainer {"+
        "max-width: 75px;"+
      "}"+
      "#rnt_companionForm .formContainer_header {"+
        "max-width: 95px;"+
        "padding: 0 5px 0 5px;"+
      "}"+

      "#rnt_companionForm.active .formContainer_header {"+
        "max-width: initial;"+
        "padding: 0 5px 0 30px;"+
      "}"+

      "#rnt_companionForm .formContainer_header p {"+
        "font-size: 0px;"+
        "margin-right: 10px;"+
      "}"+

      "#rnt_companionForm.active .formContainer_header p {"+
        "font-size: 14px;"+
        "margin: 0px;"+
      "}"+
    "}"+

    "#rnt_companionForm .formContainer_header p i {"+
      "margin-left: 5px;"+
      "transform: rotate(180deg);"+
      "transition: all .3s ease-in-out;"+
    "}"+

    "#rnt_companionForm.active .formContainer_header p i {"+
      "transform: rotate(0deg);"+
    "}"+

    "#rnt_companionForm .formContainer_header p i img {"+
      "display: block;"+
    "}"+

    "#rnt_companionForm .formContainer_body {"+
      "font-family: renault_liferegular, sans-serif;"+
      "font-size: 14px;"+
      "box-sizing: border-box;"+
      "max-height: 0px;"+
      "overflow: hidden;"+
      "transition: all .3s ease-in-out;"+
    "}"+

    "#rnt_companionForm.overflow .formContainer_body {"+
      "overflow: visible;"+
    "}"+

    "#rnt_companionForm .formContainer_body .rntLegalTerms {"+
      "text-align: left;"+
    "}"+

    "#rnt_companionForm .formContainer_body .rntLegalTerms input {"+
      "display: inline-block;"+
      "width: initial;"+
    "}"+

    "#rnt_companionForm .formContainer_body .rntLegalTerms p {"+
      "padding: 0; "+
      "font-size: 11px;"+
      "font-family: renault_liferegular, sans-serif;"+
    "}"+

    "#rnt_companionForm .formContainer_body .rntLegalTerms p a {"+
      "padding: 0; "+
      "font-size: 11px;"+
      "display: inline-block;"+
      "text-transform: initial;"+
      "height: initial;"+
    "}"+

    "#rnt_companionForm .formContainer_body .rntLegalTerms p.title {"+
      "color:#000;"+
      "text-transform: uppercase;"+
      "margin-top: 15px;"+
      "margin-bottom: 0px;"+
    "}"+

    "#rnt_companionForm .formContainer_body .rntLegalTerms label {"+
      "max-height: 100px;"+
      "overflow: hidden;"+
      "display: block;"+
      "position: relative;"+
      "transition: all .3s ease-in-out;"+
    "}"+

    "#rnt_companionForm .formContainer_body .rntLegalTerms.active label {"+
      "max-height:145px;"+
      "overflow-y: scroll;"+
    "}"+

    "#rnt_companionForm .formContainer_body .rntLegalTerms.active label:after {"+
      "content: '';"+
      "display: block;"+
      "position: absolute;"+
      "width: 100%;"+
      "background: none;"+
      "height: 0px;"+
      "bottom: 0;"+
    "}"+

    "#rnt_companionForm .formContainer_body .rntLegalTerms label:after {"+
      "content: '';"+
      "display: block;"+
      "position: absolute;"+
      "width: 100%;"+
      "background: linear-gradient(0deg, rgba(255,204,51,1) 0%, rgba(255,204,51,0.32816876750700286) 100%);"+
      "height: 70px;"+
      "bottom: 0;"+
    "}"+

    "#rnt_companionForm .formContainer_body .rntLegalTerms.active a {"+
      "margin-top: 0px;"+
    "}"+

    "#rnt_companionForm .formContainer_body .rntLegalTerms a {"+
      "font-size: 12px;"+
      "text-transform: uppercase;"+
      "text-align: center;"+
      "color: #000;"+
      "margin-top: -30px;"+
      "position: relative;"+
      "background: none;"+
      "height: 50px;"+
      "display: flex;"+
      "align-items: center;"+
      "justify-content: center;"+
      "font-style: italic;"+
    "}"+

    "#rnt_companionForm.active .formContainer_body {"+
      "margin-top: 20px;"+
      "box-sizing: border-box;"+
      "max-height: 1000px;"+
    "}"+

    "#rnt_companionForm.active .formContainer_body #errorMsg {"+
      "display: none;"+
      "padding: 0 30px 5px;"+
      "color: #ff5b5b;"+
      "font-size: 12px;"+
    "}"+

    "#rnt_companionForm.active .formContainer_body #errorMsg.active {"+
      "display: block;"+
    "}"+

    "#rnt_companionForm .formContainer_body p {"+
      "margin: 0px 0px 10px;"+
      "padding: 0 30px;"+
      "color: #000;"+
      "font-size: 14px;"+
      "text-transform: none;"+
      "letter-spacing: initial;"+
      "line-height: initial;"+
    "}"+

    "#rnt_companionForm .formContainer_body p.hide {"+
      "padding: 0;"+
      "display: none; "+
    "}"+

    "#rnt_companionForm #successMsg {"+
      "display: none;"+
      "text-align: center;"+
      "font-family: renault_lifebold, renault_liferegular, sans-serif;"+
    "}"+

    "#rnt_companionForm #successMsg h3 {"+
      "font-size: 14px;"+
      "letter-spacing: initial;"+
      "color: #000;"+
      "width: 80%;"+
      "margin: 0 auto;"+
    "}"+

    "#rnt_companionForm #successMsg.active {"+
      "display: block;"+
    "}"+

    "#rnt_companionForm .formContainer_body-form.hide {"+
      "display: none;"+
    "}"+

    "#rnt_companionForm .formContainer_body-form {"+
      "padding: 0 30px;"+
      "box-sizing: border-box;"+
    "}"+

    "#rnt_companionForm .formContainer_body-form select {"+
      "-webkit-appearance: none;"+
      "-moz-appearance: none;"+
      "-ms-appearance: none;"+
      "border-radius: 0px;"+
    "}"+

    "#rnt_companionForm .formContainer_body-form select,"+
    "#rnt_companionForm .formContainer_body-form input {"+
      "width: 100%;"+
      "box-sizing: border-box;"+
      "border: none;"+
      "text-transform: uppercase;"+
      "font-family: renault_lifebold, sans-serif;"+
      "font-style: italic;"+
      "font-size: 12px;"+
      "color: #b6b6b6;"+
      "margin-bottom: 5px;"+
      "padding: 5px 10px;"+
      "background: #FFF;"+
      "border-radius: 0px;"+
    "}"+
     
    "#rnt_companionForm  .formContainer_body-form #rnt_companionForm-wpp,"+
    "#rnt_companionForm  .formContainer_body-form #rnt_companionForm-send {"+
      "background: #000;"+
      "width: 90%;"+
      "margin: 0 auto;"+
      "color: #ffcc33;"+
      "display: flex;"+
      "align-items: center;"+
      "justify-content: center;"+
      "text-align: center;"+
      "text-transform: uppercase;"+
      "font-size: 13px;"+
      "text-decoration: none;"+
      "font-family: renault_liferegular, sans-serif;"+
      "padding: 5px 0;"+
      "border: none;"+
      "outline: 0px;"+
      "cursor: pointer;"+
      "margin-bottom: -30px;"+
    "}"+

    "#rnt_companionForm  .formContainer_body-form #rnt_companionForm-wpp {"+
      "margin-bottom: 5px;" +
    "}"+

    "#rnt_companionForm  .formContainer_body-form #rnt_companionForm-send:disabled {"+
      "background-image: url(https://contato.renault.com.br/contato-assets/loading-bg.gif);"+
      "background-color: #000;"+
      "background-size: contain;"+
      "background-repeat: no-repeat;"+
      "background-position: center;"+
      "line-height: 22px;"+
      "font-size: 0px;"+
      "opacity: .8;"+
    "}"+

    "#rnt_companionForm  .formContainer_body-form #rnt_companionForm-send:disabled i {"+
      "display: none;"+
    "}"+

    "#rnt_companionForm  .formContainer_body-form #rnt_companionForm-send i {"+
      "display: inline-block;"+
      "margin-left: 5px;"+
    "}"+

    "#rnt_companionForm  .formContainer_body-form #rnt_companionForm-send i img {"+
      "display: block;"+
    "}";
  

  const formContentHTML = `<div class="formContainer">
    <div class="formContainer_header">
      <p>Entre em contato 
        <i>
          <img src="https://contato.renault.com.br/contato-assets/header-arrow.jpg"/>
        </i>
      </p>

      <i>
        <img src="https://contato.renault.com.br/contato-assets/whatsapp-ico.png"/>
      </i>
    </div>
    
    <div class="formContainer_body">
      <p>Preencha os campos abaixo que em breve entraremos em contato com você.</p>
      <small id="errorMsg"></small>
      <form class="formContainer_body-form" >
        <input class='rntFormVal' name="fullName" placeholder="Nome Completo" id="rnt_companion_nome" required/>
        <input class='rntFormVal' name="cpf" placeholder="CPF" id="rnt_companion_cpf" maxlength="14" OnBlur="rntValidaCPF();" required/>
        <input class='rntFormVal' name="mobile" type="phone" minlength="15" maxlength="15" placeholder="Telefone Ex.: (99) 99999-9999" id="rnt_companion_phone" maxlength="11" onblur="rntMobileMask(this)" required/>
        <select class='rntFormVal' name="model" style="appearance: none;" id="rnt_companion_vehicle" required>
          <option value="" disabled="" class="" selected="selected">Selecione um modelo</option>
          <option label="KWID" value="KWID">KWID</option>
          <option label="NOVO LOGAN" value="NOVO LOGAN">NOVO LOGAN</option>
          <option label="NOVO SANDERO" value="NOVO SANDERO">NOVO SANDERO</option>
          <option label="NOVO STEPWAY" value="NOVO STEPWAY">NOVO STEPWAY</option>
          <option label="DUSTER" value="DUSTER">DUSTER</option>
          <option label="DUSTER OROCH" value="DUSTER OROCH">DUSTER OROCH</option>
          <option label="CAPTUR" value="CAPTUR">CAPTUR</option>
          <option label="ZOE" value="ZOE">ZOE</option>
          <option label="MASTER CHASSI" value="MASTER CHASSI">MASTER CHASSI</option>
          <option label="MASTER FURGAO" value="MASTER FURGAO">MASTER FURGAO</option>
          <option label="MASTER VITRÉ" value="MASTER VITRÉ">MASTER VITRÉ</option>
          <option label="MASTER MINIBUS" value="MASTER MINIBUS">MASTER MINIBUS</option>
        </select>

        <div class="rntLegalTerms">
          <p class="title">Termos Legais:</p>
          <input type="checkbox" id="termOfUseOfPersonalData" required/>
          <label for="termOfUseOfPersonalData">
            <p>Para Renault Brasil, a proteção da privacidade de seus dados é nossa prioridade. Assim, a Renault Brasil esclarece que os dados coletados são tratados de forma sigilosa, prezando pela sua proteção nos termos da Lei.</p>

            <p>Os dados são utilizados para a gestão da relação comercial, administração de suas demandas, o envio de pesquisas de satisfação, relacionamento cliente bem como comunicações de marketing direto, com ofertas comerciais de produtos e serviços personalizadas que possam ser de seu interesse.</p>

            <p>Você tem o direito de acessar, solicitar a retificação ou a exclusão de seus dados pessoais. Você também tem direito de retirar, a qualquer momento, o seu consentimento, para os fins dos quais o mesmo foi obtido entre em contato a través do e-mail <a href="mailto:dpo.brasil@renault.com">dpo.brasil@renault.com</a></p>

            <p> Considerando a importância de seus dados, a Renault Brasil solicita e orienta que seja feita uma leitura atenta da nossa Política de Privacidade, para que autorize ou não a coleta de seus dados pessoais fornecidos, nos seguintes termos: Com o preenchimento do presente formulário, atesto minha maioridade e com isso, a validade do presente consentimento. Desta forma, autorizo a Renault Brasil a coletar, tratar, armazenar e compartilhar minhas informações com a rede de concessionários autorizados, empresas do Grupo Renault e outras empresas parceiras, exclusivamente para os fins descritos na <a href="https://www.renault.com.br/politica-de-privacidade.html" target="_blank">Política de Privacidade</a> da Renault Brasil.</p>
          </label>
          <a id="rntReadMore" href="#">Leia Mais</a>
        </div>
        <button id="rnt_companionForm-wpp">Falar com atendente agora 
          <i>
            <img src="https://contato.renault.com.br/contato-assets/send-arrow.jpg"/>
          </i>
        </button>
        <button id="rnt_companionForm-send">Enviar 
          <i>
            <img src="https://contato.renault.com.br/contato-assets/send-arrow.jpg"/>
          </i>
        </button>
      </form>
      <div id="successMsg">
        <h3>Dados enviados com sucesso!</h3>
        <h3>Um de nossos consultores entrará em contato.</h3>
      </div>
    </div>
  </div>`;

  formContainerStyleTag.innerHTML = formContainerStyles;
  formContainer.innerHTML = formContentHTML;
  document.getElementsByTagName('body')[0].appendChild(formContainer);
  document.getElementsByTagName('head')[0].appendChild(formContainerStyleTag);

  const headerComponent = document.getElementsByClassName('formContainer_header')[0];
  const companionFormComponent = document.getElementById('rnt_companionForm');
  const rntReadMoreBtn = document.getElementById('rntReadMore');
  const rntLegalTermsLabel = document.querySelector('.rntLegalTerms label')

  headerComponent.addEventListener('click', function () {
    if (companionFormComponent.classList.contains("active")) {
      companionFormComponent.classList.remove('active');
      companionFormComponent.classList.remove('overflow');

      dataLayer.push({
        'event': 'interaction',
        'category': 'Entre em contato',
        'action': 'Click',
        'label': 'Fechar'
      })
    } else {
      companionFormComponent.classList.add('active');

      setTimeout(function () {
        companionFormComponent.classList.add('overflow');
      }, 300);

      dataLayer.push({
        'event': 'interaction',
        'category': 'Entre em contato',
        'action': 'Click',
        'label': 'Abrir'
      })
    }
  });

  rntReadMoreBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const rntLegalTerms = document.getElementsByClassName('rntLegalTerms')[0];

    if (!rntLegalTerms.classList.contains('active')) {
      rntLegalTerms.classList.add('active');
      rntReadMoreBtn.innerText = 'Leia Menos';
    } else {
      rntLegalTerms.classList.remove('active');
      rntReadMoreBtn.innerText = 'Leia Mais';
    }

  })

  rntOnFormSubmit();
};