const emailStyle = `  background: -webkit-linear-gradient(to top, #9890c7, #e6d4de);
background: linear-gradient(to top, #9890c7, #e6d4de);
background-repeat: no-repeat;
min-height: 100vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;`;

const emailWrapper = ` max-width: 413px;
background-color: #f9f9fe;
color: #2d2e46;
padding: 25px 20px;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 8px;`;

const emailTitle = ` max-width: 320px;
background-color: #f9f9fe;
color: #2d2e46;
padding: 25px 20px;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 8px;
font-size: 45px;`;

const emailSubtitle = `display: inline-block;
font-size: 22px;
margin: 0 0 50px 0;
align-items: center;
opacity: 0.6;`;

const emailButton = `border: 0;
border-radius: 18px;
transition: all 0.3s ease;
background-color: #21268f;
color: white;
margin: 10px;
cursor: pointer;
height: 36px;
font-size: 16px;
user-select: none;
width: 266px;
font-weight: 900;
display: flex;
justify-content: center;
align-items: center;`;

export const resetPasswordEmailMessages = `<div style="${emailStyle}">
<div style="${emailWrapper}">
  <h1 style="${emailTitle}">It-Incubator</h1>
  <span style="${emailSubtitle}"
    >Your password has been reset . If you did not mean to reset your password, you can just
    ignore this email and your password will not change. To reset your password, click on the
    Reset Password link below.</span
  >
  <a  style="${emailButton}" href='https://tenebran.github.io/cards-nya/#/newpassword/$token$'>Reset Password</a>
</div>`;
