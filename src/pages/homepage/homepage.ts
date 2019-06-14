import { AboutOhevPage } from './../about/aboutohev';
import { AboutAppPage } from './../about/about';

import { Component } from "@angular/core";
import { MenuController, NavController } from "ionic-angular";
import { ListPage } from "../list/list";
import { ComingsoonPage } from "../comingsoon/comingsoon";
import { ShabbatPage } from "../shabbat/shabbat";

@Component({
  selector: "page-homepage",
  templateUrl: "homepage.html"
})
export class Homepage {

  rootPage = Homepage;
  sample = {
      "enTitle": "Kiddush",
      "heTitle": "קידוש",
      "text-hebrew": [
        "וַיְהִי עֶרֶב וַיְהִי בקֶר:",
        "יום הַשִּׁשִּׁי. וַיְכֻלּוּ הַשָּׁמַיִם וְהָאָרֶץ וְכָל צְבָאָם:",
        "וַיְכַל אֱלהִים בַּיּום הַשְּׁבִיעִי מְלַאכְתּו אֲשֶׁר עָשָׂה. וַיִּשְׁבּת בַּיּום הַשְּׁבִיעִי מִכָּל מְלַאכְתּו אֲשֶׁר עָשָׂה:",
        "וַיְבָרֶךְ אֱלהִים אֶת יום הַשְּׁבִיעִי וַיְקַדֵּשׁ אתו. כִּי בו שָׁבַת מִכָּל מְלַאכְתּו אֲשֶׁר בָּרָא אֱלהִים לַעֲשׂות:",
        "סַבְרִי מָרָנָן וְרַבָּנָן וְרַבּותַי:",
        "בָּרוּךְ אַתָּה ה'. אֱלהֵינוּ מֶלֶךְ הָעולָם בּורֵא פְּרִי הַגָּפֶן:",
        "בָּרוּךְ אַתָּה ה' אֱלהֵינוּ מֶלֶךְ הָעולָם. אֲשֶׁר קִדְּשָׁנוּ בְּמִצְותָיו וְרָצָה בָנוּ. וְשַׁבַּת קָדְשׁו בְּאַהֲבָה וּבְרָצון הִנְחִילָנוּ. זִכָּרון לְמַעֲשֵׂה בְרֵאשִׁית. כִּי הוּא יום תְּחִלָּה לְמִקְרָאֵי קדֶשׁ זֵכֶר לִיצִיאַת מִצְרָיִם. כִּי בָנוּ בָחַרְתָּ וְאותָנוּ קִדַּשְׁתָּ מִכָּל הָעַמִּים וְשַׁבַּת קָדְשְׁךָ בְּאַהֲבָה וּבְרָצון הִנְחַלְתָּנוּ:",
        "בָּרוּךְ אַתָּה ה'. מְקַדֵּשׁ הַשַּׁבָּת:"
      ],
      "text-english": [
        "[Evening became morning]: The sixth day. And the heavens and the earth and all that filled them were complete.",
        "And on the seventh day God completed the labor He had performed, and He refrained on the seventh day from all the labor which He had performed.And God blessed the seventh day and He sanctified it, for He then refrained from all his labor - from the act of creation that God had performed.",
        "Permit me, distinguished ones, rabbis, guests and colleagues:",
        "Blessed are You, the Lord our God, King of the Universe, Creator of the fruit of the vine.(Amen)",
        "Blessed are You, Lord our God, King of the Universe, Who sanctified us with His commandments, and hoped for us, and with love and intent invested us with His sacred Sabbath, as a memorial to the deed of Creation. It is the first among the holy festivals, commemorating the exodus from Egypt. For You chose us, and sanctified us, out of all nations, and with love and intent You invested us with Your Holy Sabbath.",
        "Blessed are You, Adonai, Sanctifier of the Sabbath.(Amen)"
      ],
      "audiotracks":[
        {
          "title":"Default",
          "audio":"./assets/audio/Kiddush1.m4a",
          "words": []
        }
      ]
  }
  constructor(public menu: MenuController, public navCtrl: NavController) {
    
  }
  openPage() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.navCtrl.push(ShabbatPage);
  }
  openAboutApp() {
    this.navCtrl.push(AboutAppPage);
  }
  openAboutOhev(){
    this.navCtrl.push(AboutOhevPage);
  }
  openComingSoon() {
    this.navCtrl.push(ComingsoonPage, { item: {"enTitle":"TITLE","heTitle":"", "nodes":[this.sample]}});
  }

}

