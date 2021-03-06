<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
            <!--[if mso]>
                <style>
                    * {
                        font-family: sans-serif !important;
                    }
                </style>
            <![endif]-->
            <style>

                html,
                body {
                    margin: 0 auto !important;
                    padding: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                }
                * {
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }
                table,
                td {
                    mso-table-lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
                }
                table {
                    border-spacing: 0 !important;
                    border-collapse: collapse !important;
                    table-layout: fixed !important;
                    margin: 0 auto !important;
                }
                img {
                    -ms-interpolation-mode:bicubic;
                }
                *[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
                .button-link {
                    text-decoration: none !important;
                }
                @media screen and (max-width: 500px) {
                    .responsive-title{
                        font-size: 40px !important;
                        line-height: 45px !important;
                    }
                    .email-container {
                       max-width: 375px !important;
                    }
                    .column-mobile-full, td[class*='column-mobile-full']{
                        max-width: 375px !important;
                        width: 100% !important;
                        text-align: center !important;
                        display: block !important;
                        margin: 20px 0 !important;
                        padding: 0 !important;
                        line-height: 50px !important;

                    }
                    td[class*='header'],.header{
                        padding: 0 20px !important;
                    }
                    td[class*='padding-mobile']{
                        padding: 20px !important;
                    }
                    td[class*='button-td'],.button-td{
                        margin: 25px;
                        padding:
                        display: block;
                    }
                    .fluid {
                        width: 100% !important;
                        max-width: 100% !important;
                        height: auto !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                     .stack-column,
                    .stack-column-center {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        direction: ltr !important;
                    }
                    .stack-column-center {
                        text-align: left !important;
                    }
                    .center-on-narrow {
                        text-align: center !important;
                        display: block !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                        float: none !important;
                    }
                    table.center-on-narrow {
                        display: inline-block !important;
                    }
                }
            </style>

</head>
<body width="100%" bgcolor="#222222" style="margin: 0; mso-line-height-rule: exactly;">
    <center style="width: 100%; background: #222222; text-align: left;">

        <!-- Visually Hidden Preheader Text : BEGIN -->
        <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;">
            (Optional) This text will appear in the inbox preview, but not the email body.
        </div>
        <!-- Visually Hidden Preheader Text : END -->

        <!--
            Set the email width. Defined in two places:
            1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 680px.
            2. MSO tags for Desktop Windows Outlook enforce a 680px width.
            Note: The Fluid and Responsive templates have a different width (600px). The hybrid grid is more "fragile", and I've found that 680px is a good width. Change with caution.
        -->
        <div style="max-width: 680px; margin: auto;" class="email-container">
            <!--[if mso]>
            <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="680" align="center">
            <tr>
            <td>
            <![endif]-->

            <!-- Email Header : BEGIN -->
            <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;" bgcolor="008558">
                <tr>
                    <td width="20"></td>
                    <td style="padding: 20px 0; text-align: left">
                        <img src="{{ URL::to('/') }}/public/img/mail-images/img_03.jpg" aria-hidden="true" width="200" height="50" alt="alt_text" border="0" style="height: auto; background: #008558; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                    </td>
                </tr>
            </table>
            <!-- Email Header : END -->

            <!-- Email Body : BEGIN -->
            <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;" class="email-container">

                <!-- Hero Image, Flush : BEGIN -->
                <tr height="20">
                    <td bgcolor="#ffffff" height="20">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" style="padding: 0 20px">
                        <img src="{{ URL::to('/') }}/public/img/mail-images/img_07.jpg" aria-hidden="true" width="680" height="" alt="alt_text" border="0" align="center" class="fluid" style="width: 100%; max-width: 680px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;" class="g-img">
                    </td>
                </tr>
                <tr height="20">
                    <td bgcolor="#ffffff" height="20">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                </tr>
                <!-- Hero Image, Flush : END -->

                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td bgcolor="#ffffff">
                        <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 0 20px; text-align: left;">
                                    <h1 class="responsive-title" style="margin: 0; font-family: 'helvetica', arial,sans-serif; font-size:   58px; line-height: 72px; font-weight: bold; color: #008657;">@yield('title')</h1>
                                </td>
                            </tr>
                            <tr height="20">
                                <td bgcolor="#ffffff" height="20">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            </tr>
                            <tr height="40">
                                <td bgcolor="#ffffff" height="40" style="border-top:1px solid #eeeeee;">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding: 0 20px; font-family: 'helvetica', arial,sans-serif; font-size: 15px; line-height: 20px; color: #555555; text-align: left;  font-weight: light;">
                                    {{-- <p style="margin: 0;">Gracias por contactarnos, has hecho una solicitud de respuesto para:</p> --}}
                                </td>
                            </tr>
                            <tr height="40">
                                <td bgcolor="#ffffff" height="40" >&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding: 0 20px; font-family: 'helvetica', arial,sans-serif; font-size: 29px; line-height: 32px; color: #008657; text-align: left;  font-weight: light;">
                                    <p style="margin: 0;">@yield('subject')</p>
                                    <strong style="font-weight: bold"> @yield('actions')</strong>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->

                <!-- 2 Even Columns : BEGIN -->
                <tr>
                    <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%">
                        <!--[if mso]>
                        <table role="presentation" aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="660">
                        <tr>
                        <td align="center" valign="top" width="660">
                        <![endif]-->
                        <table role="presentation" aria-hidden="true" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:680px;">
                            <tr>
                                <td align="center" valign="top" style="font-size:0; padding: 10px 0;">
                                    <!--[if mso]>
                                    <table role="presentation" aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="660">
                                    <tr>
                                    <td align="left" valign="top" width="330">
                                    <![endif]-->
                                    <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column">
                                        <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <!--==========================================
                                                    COLUMN TEXT
                                               ==========================================-->
                                            <tr>
                                                <td style="padding: 10px 20px;">
                                                    <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;">

                                                        @section('left_col')
                                                            <!-- TITLE COLUMN-->
                                                            <tr>
                                                                <td style="font-family: 'helvetica', arial,sans-serif; font-size: 15px; line-height: 20px; color: #008657; opacity:0.4;padding-top: 10px;" class="stack-column-center">
                                                                    <p style="margin: 0;">Nombre</p>
                                                                </td>
                                                            </tr>
                                                            <!-- END TITLE COLUMN-->
                                                             <!-- TEXT COLUMN-->
                                                            <tr>
                                                                <td style="font-family: 'helvetica', arial,sans-serif; font-size: 22px; line-height: 24px; color: #008657; opacity:1; padding-top: 10px;" class="stack-column-center">
                                                                    <p style="margin: 0;">Juan Julio</p>
                                                                </td>
                                                            </tr>
                                                            <!-- END TEXT COLUMN-->
                                                        @show

                                                    </table>
                                                </td>
                                            </tr>
                                               <!--==========================================
                                                    COLUMN TEXT
                                               ==========================================-->

                                        </table>
                                    </div>
                                    <!--[if mso]>
                                    </td>
                                    <td align="left" valign="top" width="330">
                                    <![endif]-->
                                    <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column">
                                        <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>

                                                    <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;">
                                                        @section('right_col')
                                                            <!-- TITLE COLUMN-->
                                                            <tr>
                                                                <td style="font-family: 'helvetica', arial,sans-serif; font-size: 15px; line-height: 20px; color: #008657; opacity:0.4;padding-top: 10px;" class="stack-column-center">
                                                                    <p style="margin: 0;">Nombre</p>
                                                                </td>
                                                            </tr>
                                                            <!-- END TITLE COLUMN-->
                                                             <!-- TEXT COLUMN-->
                                                            <tr>
                                                                <td style="font-family: 'helvetica', arial,sans-serif; font-size: 22px; line-height: 24px; color: #008657; opacity:1; padding-top: 10px;" class="stack-column-center">
                                                                    <p style="margin: 0;">Juan Julio</p>
                                                                </td>
                                                            </tr>
                                                            <!-- END TEXT COLUMN-->
                                                        @show
                                                    </table>

                                            </tr>
                                        </table>
                                    </div>
                                    <!--[if mso]>
                                    </td>
                                    </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                </tr>
                <!-- 2 Even Columns : END -->
                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td bgcolor="#ffffff">
                        <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="100%"  bgcolor="#ffffff">

                            <tr height="20">
                                <td bgcolor="#ffffff" height="20" style="border-top:1px solid #eeeeee;">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding: 0 20px; font-family: 'helvetica', arial,sans-serif; font-size: 10px; line-height: 20px; color: #555555; text-align: left;  font-weight: light;">
                                    <p style="margin: 0;">@yield('footer_text')</p>
                                </td>
                            </tr>
                             <tr height="20">
                                <td bgcolor="#ffffff" height="20">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->

            </table>
            <!-- Email Body : END -->

            <!-- Email Footer : BEGIN -->
            <table bgcolor="#000000" role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;">

                        <tr>
                            <td  class="column-mobile-full" align="left" width="172" style="color:#ffffff; padding-left:20px; font-family: 'helvetica', arial,sans-serif; font-size: 10px;" height="50">
                                <span style="font-weight: light;">Copyright © 2015</span> <strong style="font-weight: bold;">Sullair Argentina</strong>
                            </td>
                            <td  class="column-mobile-full" style="padding: 0 20px; font-family: 'helvetica', arial,sans-serif; font-size: 10px; line-height: 20px; color: #555555; text-align: left;  font-weight: light; max-width: 172px; width: 100%; line-height: 50px" width="172" align="center">
                                    <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" width="172" height="50">
                                        <tr>
                                            <td width="15">
                                                <a href="https://www.facebook.com/SullairArg"><img style="display: block; line-height: 50px; margin: 0; padding: 0;" src="{{ URL::to('/') }}/public/img/mail-images/img_11.jpg" alt=""></a>
                                            </td>
                                             <td height="20" width="20">&nbsp;</td>
                                             <td width="15">
                                                <a href="http://www.linkedin.com/company/108461?trk=tyah"><img style="display: block; line-height: 50px; margin: 0; padding: 0;" src="{{ URL::to('/') }}/public/img/mail-images/img_13.jpg" alt=""></a>
                                            </td>
                                            <td height="20" width="20">&nbsp;</td>
                                             <td width="15">
                                                <a href="http://www.youtube.com/user/SullairArgentina"><img style="display: block; line-height: 50px; margin: 0; padding: 0;" src="{{ URL::to('/') }}/public/img/mail-images/img_15.jpg" alt=""></a>
                                            </td>
                                            <td height="20" width="20">&nbsp;</td>
                                             <td width="15">
                                                <a href="https://plus.google.com/u/2/b/112814324929528379185/112814324929528379185/about"><img style="display: block; line-height: 50px; margin: 0; padding: 0;" src="{{ URL::to('/') }}/public/img/mail-images/img_17.jpg" alt=""></a>
                                            </td>
                                            <td height="20" width="20">&nbsp;</td>
                                             <td width="15">
                                                <a href="https://www.instagram.com/sullaircultura/"><img style="display: block; line-height: 50px; margin: 0; padding: 0;" src="{{ URL::to('/') }}/public/img/mail-images/img_19.jpg" alt=""></a>
                                            </td>
                                        </tr>
                                    </table>
                            </td>
                            <td  class="column-mobile-full" align="left" width="172" style="color:#ffffff; font-family: 'helvetica', arial,sans-serif; font-size: 10px;" height="50">
                               Contactanos <strong style="font-weight: bold;">(54 11) 5941 4444</strong>
                            </td>
                        </tr>


            </table>
            <!-- Email Footer : END -->

            <!--[if mso]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </div>



    </center>
</body>
</html>
