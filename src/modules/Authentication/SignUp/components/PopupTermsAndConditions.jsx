import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Grid,
  DialogContent,
  Dialog,
} from '@material-ui/core';
import { Text } from 'components'
import useStyles from './styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const PopupTermsAndConditions = forwardRef((props, ref) => {
  const classes = useStyles()
  const [dialog, setDialog] = useState(false);
  useImperativeHandle(ref, () => ({
    onOpen() {
      setDialog(true);
    }

  }));
  const onClose = () => {
    setDialog(false)
  }
  return (
    <div className={classes.root}>
      <Dialog
        open={dialog}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          paper: classes.container,
          paperScrollPaper: classes.paperScrollPaper,
        }}
      >
        <DialogContent classes={{ root: classes.containerBody }}>
          <Grid className={classes.dialogTitleSection}>
            <ArrowBackIosIcon className={classes.iconTitle} onClick={onClose} />
            <Grid className={classes.dialogTitle}>
              <Text type='bold'>TERMS OF USE</Text>
            </Grid>
          </Grid>

          <Grid className={classes.dialogContent}>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Terms</Text>
              These terms of use ("terms") are a legal agreement between you ("you” or "your”) and Neuronal Pte Ltd., developer of Cortishare; online SaaS application (the “Application”) also herein referred to as “we” “our” and “us”. By using Cortishare you agree that you have read, understood, accept, and agree to be bound by these terms. If you do not agree to these terms, do not access, or otherwise use the platform.
            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Privacy Policy</Text>
              You are advised to read our privacy policy regarding our user data collection, it will help you better understand our practices. Please click on the link to our privacy policy.            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>The Online SaaS Application</Text>
              Cortishare is a collaborative solution for managing projects and growing knowledge in multi-media formats.            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>User Account</Text>
              By creating an account on this platform, you warrant that:
              <ol>
                <li>The Personal Information which you provide is true, complete and accurate in all respects.</li>
                <li>We will be duly notified upon any changes to the Personal Information by contacting us by e-mail and/or updating your Personal Information under your Account.</li>
                <li>You agree not to use a false name, a name that you are not authorised to use or to impersonate any other person or entity.</li>
              </ol>
              If you are an owner of an account, you are solely responsible for maintaining the confidentiality of your private user details (username and password). You are responsible for all activities that occur under your account or password.
            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Basic Terms</Text>
              <p>You are responsible for your use of Cortishare, for any Content made public by use of the application, and for any consequences thereof.  “Content” includes, but is not limited to, videos, text, music, sounds, photos, and graphics. </p>
              <p>You may use the Services only if you can form a binding contract with the Developer and are not a person legally barred from receiving services. If you are accepting these Terms and using the Application on behalf of a company, organization, government, or other legal entity, you represent and warrant that you are authorized to do so. You may use the Application only in compliance with these Terms and all applicable local, state, national, and international laws, rules and regulations.</p>
              <p>The Services that Cortishare provides are always evolving and the form and the nature of the Services provided may change from time to time without prior notice to you. In addition, the Developer may stop (permanently or temporarily) providing any and all third party services utilized in any manner whatsoever with the Application (collectively the “Services” or any features within the Services) to the benefit of you or to users generally and may not be able to provide you with prior notice. The Developer also retains the right to create limits on use and storage at its sole discretion at any time without prior notice to you.</p>
            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Privacy</Text>
              Any information that you provide to the Application or the Developer is subject to our Privacy Policy, which governs our collection and use of your information. You understand that through your use of the Services you consent to the collection and use (as set forth in the Privacy Policy) of this information, including the transfer of this information to Singapore and/or other countries for storage, processing and use by Cortishare. As part of providing you the Services, we may need to provide you with certain communications, such as service announcements and administrative messages.
            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Passwords</Text>
              You are responsible for safeguarding the password or credentials that you use to access the Services and for any activities or actions under your account. We encourage you to use "strong" passwords (passwords that use a combination of upper- and lower-case letters, numbers and symbols) with your account and with other accounts that you may connect to your Cortishare account (such as your email). We strongly advise against storing any sensitive information including passwords on the platform. Cortishare cannot and will not be liable for any loss or damage arising from your failure to comply with the above requirements.            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Content Posted to the Services</Text>
              <p>All Content, whether publicly posted or privately transmitted, is the sole responsibility of the person who originated such Content. We may, but are not required to monitor or control the Content posted via the Services and we cannot take responsibility for such Content. Any use or reliance on any Content or materials posted via the Services or obtained by you through the Services is at your own risk.</p>
              <p>We do not endorse, support, represent or guarantee the completeness, truthfulness, accuracy, or reliability of any Content or communications posted via the Services or endorses any opinions expressed via the Services. Under no circumstances will Cortishare be liable in any way for any Content, including, but not limited to, any errors or omissions in any Content, or any loss or damage of any kind incurred as a result of the use of any Content posted, emailed, transmitted or otherwise made available via the Services or broadcast elsewhere.</p>
            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Prohibited Activities</Text>
              In addition to the other restrictions outlined in these Terms, you agree that you will not:
              <ol>
                <li>Use the Services in any manner that could damage, disable, overburden, or impair the functioning of the Services in any manner.</li>
                <li>Compromise the security of the Services.</li>
                <li>Use any automated means or interface not provided by the Developer to access the Services or to extract data.</li>
                <li>Reverse engineer any aspect of the Services.</li>
                <li>Attempt to access features of the Services that you are not authorized to access.</li>
                <li>Develop any third-party application(s) that interacts with Content or the Services without the Developer’s prior written consent.</li>
                <li>Use the Services for any illegal or unauthorized purpose.</li>
              </ol>
              Unauthorized use of this application in such way that affects the application negatively will give rise to a claim in damages and/or be a criminal offence against such user.
            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Payment Policy</Text>
              <p>Cortishare accepts payment for subscription plans through PayPal and all major credit cards. Payment transactions are automatically carried out by the credit or debit card company and charged to your card with the amount corresponding to the total order price.</p>
              <p>Payment by credit or debit card prompts an authorization hold, an automatic request to clear the transaction. </p>
              <p>Bank transactions by credit or debit card, undertaken between the customer and Cortishare, is secured and therefore fully encrypted and protected.</p>
              <p>User represents and warrants that:</p>
              <ol>
                <li>Payment information supplied is true, correct, and complete.</li>
                <li>Charges incurred by the User will be honoured by User’s financial institution.</li>
                <li>User shall pay charges incurred by the User at the amounts in effect at the time incurred, including all applicable taxes. </li>
                <li>User shall be responsible for all charges incurred using User’s password.</li>
                <li>User agrees to keep his or her sensitive user information such as password confidential.</li>
              </ol>
              <p>We reserve the right at any time to charge or modify fees charged for Services. Hence, you will be given reasonable advance notice of such fees and the opportunity to cancel your subscription plan. If you elect not to pay any fees charged by Cortishare, we reserve the right to stop providing the Service to you.</p>
            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Refunds</Text>
              Cortishare makes no representations, warranties, or provisions for any form of refund whatsoever, all purchases are final.
            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Our Rights</Text>
              <p>We always reserve the right (but will not have an obligation) to remove or refuse to distribute any Content on the Services, to suspend or terminate users, and to reclaim usernames and profile URLs without liability to you.</p>
              <p>We also reserve the right to access, read, preserve, and disclose any information as we reasonably believe is necessary to (i) satisfy any applicable law, regulation, legal process or governmental request, (ii) enforce the Terms, including investigation of potential violations hereof, (iii) detect, prevent, or otherwise address fraud, security or technical issues, (iv) respond to user support requests, or (v) protect the rights, property or safety of the Application, its users and the public. Neither the Application nor the Developer discloses personally identifying information to third parties except in accordance with our Privacy Policy.</p>
              <p>You may not do any of the following while accessing or using the Services: (i) access, tamper with, or use non-public areas of the Services, the Application or the Developer's computer systems, or the technical delivery systems of the Application's providers; (ii) probe, scan, or test the vulnerability of any system or network or breach or circumvent any security or authentication measures; (iii) access or search, or attempt to access or search, the Services by any means (automated or otherwise) other than through our currently available, published interfaces that are provided by the Application (and only pursuant to those terms and conditions), unless you have been specifically allowed to do so in a separate agreement with the Application; (iv) forge any TCP/IP packet header or any part of the header information in any email or posting, or in any way use the Services to send altered, deceptive or false source-identifying information; or (v) interfere with, or disrupt, (or attempt to do so), the access of any user, host or network, including, without limitation, sending a virus, overloading, flooding, spamming, mail-bombing the Services, or by scripting the creation of Content in such a manner as to interfere with or create an undue burden on the Services.</p>
            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Copyright Policy</Text>
              <p>Cortishare and its Developers respect the intellectual property rights of others and expect users of the Services to do the same. We will respond to notices of alleged copyright infringement that comply with applicable law and are properly provided to us. If you believe that your Content has been copied in a way that constitutes copyright infringement, please provide us with the following information: (i) a physical or electronic signature of the copyright owner or a person authorized to act on their behalf; (ii) identification of the copyrighted work claimed to have been infringed; (iii) identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material; (iv) your contact information, including your address, telephone number, and an email address; (v) a statement by you that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and (vi) a statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</p>
              <p>Copyright policy on Cortishare is governed by the laws of Singapore and other applicable international copyright laws.</p>
            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>Disclaimers and Limitations of Liability</Text>
              <p>Please read this section carefully since it limits the liability of Cortishare and its parents, subsidiaries, affiliates, related companies, officers, directors, employees, agents, representatives, partners, and licensors. Each of the subsections below only applies up to the maximum extent permitted under applicable law. Some jurisdictions do not allow the disclaimer of implied warranties or the limitation of liability in contracts, and as a result the contents of this section may not apply to you. Nothing in this section is intended to limit any rights you may have which may not be lawfully limited.</p>
              <p className={classes.underline}>Disclaimers and Limitations of Liability</p>
              Your access to and use of the Services or any Content is at your own risk. You understand and agree that the Services is provided to you on an "AS IS" and "AS AVAILABLE" basis. Without limiting the foregoing, CORTISHARE DISCLAIMS ALL WARRANTIES AND CONDITIONS, WHETHER EXPRESS OR IMPLIED, OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              <p>Cortishare makes no warranty and disclaim all responsibility and liability for: (i) the completeness, accuracy, availability, timeliness, security or reliability of the Services or any Content; (ii) any harm to your computer system, loss of data, or other harm that results from your access to or use of the Services, or any Content; (iii) the deletion of, or the failure to store or to transmit, any Content and other communications maintained by the Services; (iv) whether the Services will meet your requirements or be available on an uninterrupted, secure, or error-free basis. No advice or information, whether oral or written, obtained from Cortishare or through the Services, will create any warranty not expressly made herein.</p>
              <p className={classes.underline}>Links</p>
              <p>The Services may contain links to third-party websites or resources. You acknowledge and agree that we are not responsible or liable for: (i) the availability or accuracy of such websites or resources; or (ii) the content, products, or services on or available from such websites or resources. Links to such websites or resources do not imply any endorsement by Cortishare of such websites or resources or the content, products, or services available from such websites or resources. You acknowledge sole responsibility for and assume all risk arising from your use of any such websites or resources.</p>
              <p className={classes.underline}>Limitation of Liability</p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CORTISHARE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOOD-WILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (i) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (ii) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES, INCLUDING WITHOUT LIMITATION, ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF OTHER USERS OR THIRD PARTIES; (iii) ANY CONTENT OBTAINED FROM THE SERVICES; OR (iv) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
              <p>THE LIMITATIONS OF THIS SUBSECTION SHALL APPLY TO ANY THEORY OF LIABILITY, WHETHER BASED ON WARRANTY, CONTRACT, STATUTE, TORT (INCLUDING NEGLIGENCE) OR OTHERWISE, AND WHETHER OR NOT CCF VENTURES PTY LTD HAVE BEEN INFORMED OF THE POSSIBILITY OF ANY SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.</p>
              <p className={classes.underline}>Acceptable Use and Conduct</p>
              We do our best to keep Cortishare a safe environment, but we cannot 100% guarantee it. We need your help to keep Cortishare safe, which includes the following commitments by you when using our Service:
              <ol>
                <li>You will only use the Service as permitted by law, including applicable export or re-export control laws and regulations.</li>
                <li>You will not post unauthorized commercial communications (such as spam or advertisements) on or through the Service.</li>
                <li>You will not collect users' content or information, or otherwise access the Service, using automated means (such as harvesting bots, robots, spiders, or scrapers) without our prior permission.</li>
                <li>You will not engage in unlawful multi-level marketing, such as a pyramid scheme, on the Service.</li>
                <li>You will not upload viruses or other malicious code, files or programs.</li>
                <li>You will not collect, solicit or otherwise obtain login information or access an account belonging to someone else.</li>
                <li>You will not collect, use or disclose data, including personal information, about other users without their consent or for unlawful purposes or in violation of applicable law or regulations.</li>
                <li>You will not bully, intimidate, or harass any user or use the Service in any manner that is threatening, abusive, violent, or harmful to any person or entity, or invasive of another’s privacy.</li>
                <li>You will not post or approve any User Submissions or use the Service in a manner that infringes, violates or misappropriates any third-party’s intellectual property rights or other proprietary rights, privacy rights or contractual rights.</li>
                <li>You will not post or approve content that: is hate speech, discriminating, threatening, or pornographic; incites violence; or contains nudity or graphic or gratuitous violence.</li>
                <li>You will not use the Service to do anything unlawful, deceptive, misleading, illegal, unethical, malicious, or discriminatory.</li>
                <li>You will not do anything that could disable, overburden, or impair the proper working or appearance of the Service or prevent other users from using the Service, such as a denial of service attack or interference with page rendering or other Service functionality.</li>
                <li>You will not use automated means, including spiders, robots, crawlers, data mining tools, or the like to download data from the Service, including any users' content or information, or otherwise access the Service, - except for Internet search engines (e.g. Google) and non-commercial public archives (e.g. archive.org) that comply with our robots.txt file, or "well-behaved" web services/RSS/Atom clients. We reserve the right to define what we mean by "well-behaved".</li>
                <li>You will not employ misleading email or IP addresses, or forged headers or otherwise manipulated identifiers in order to disguise the origin of any content transmitted to or through the Service.</li>
                <li>You will not use the Service in any commercially unreasonable manner or in any manner that would disparage Cortishare.</li>
                <li>You will not impersonate a Cortishare employee or any other person, or falsely state or otherwise misrepresent your affiliation with any person or entity.</li>
                <li>You will not use the Service in any manner that is harmful to minors. Without limiting the foregoing, you will not transmit or post any content anywhere on the Service, including any User Submissions, that violate child pornography laws or that otherwise violates any child sexual exploitation laws. Cortishare absolutely does not tolerate this and will report any suspected instances of child pornography, including reporting any of your user registration information, to law enforcement.</li>
                <li>You will not facilitate or encourage any violations of this Agreement or our policies, including, without, limitation, to facilitate the unlawful distribution of copyrighted content.</li>
                <li>You will not remove any copyright, trademark or other proprietary rights notices contained in or on the Service.</li>
                <li>You will not reformat or frame any portion of the web pages that are part of the Service.</li>
                <li>Any violation of the above may be grounds for termination of your right to access or use the Service.</li>
              </ol>
            </Grid>
            <Grid className={classes.dialogItem}>
              <Text type='bold'>General Terms</Text>
              <p className={classes.underline}>Waiver and Severability</p>
              <p>The failure of the Application to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision. In the event that any provision of these Terms is held to be invalid or unenforceable, then that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions of these Terms will remain in full force and effect.</p>
              <p className={classes.underline}>Assignment</p>
              <p>The Developer may assign these Terms and its rights or delegate its obligations under without your consent.  All provisions contained in these Terms shall extend to and be binding upon you and Developer’s successors and assigns. You may not assign these Terms to another person or entity.</p>
              <p className={classes.underline}>Controlling Law and Jurisdiction</p>
              <p>These Terms and any action related thereto will be governed by the laws of Singapore without regard to or application of its conflict of law provisions or your state or country of residence. All claims, legal proceedings or litigation arising in connection with the Services will be brought solely in the federal or state courts located in Singapore, and you consent to the jurisdiction of and venue in such courts and waive any objection as to inconvenient forum.</p>
              <p className={classes.underline}>Entire Agreement</p>
              <p>These Terms and our Privacy Policy are the entire and exclusive agreement between the Application, the Developer and you regarding the Services (excluding any services for which you have a separate agreement with the Application that is explicitly in addition or in place of these Terms), and these Terms supersede and replace any prior agreements between the Application and you regarding the Services.</p>
              <p>We may revise these Terms from time to time.  If the revision, in our sole discretion, is material we will notify you via email and / or through the Services.  If you do not wish to be bound by any such revisions to the Terms, you must end these Terms with the Developer.  By continuing to access or use the Services after those revisions become effective, you agree to be bound by the revised Terms.</p>
              <p>Any rights not expressly granted herein are reserved.</p>
              <Text type='bold'>Contact</Text>
              <p>If you have questions regarding our Terms and conditions please contact us.</p>
              <p>
                Neuronal Pte Ltd c/o Cortishare<br/>
                10 Anson Road #10-11 Singapore 079903<br/>
                <p className={classes.mail}>team@neuronal.co</p>
              </p>
            </Grid>
          </Grid>

        </DialogContent>
      </Dialog>
    </div >
  );
});

export default PopupTermsAndConditions;