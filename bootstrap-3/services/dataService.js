angular.module('bootstrap-3-demo')
.factory("dataService", [function () {
    return {
        getData: getData
    };

    function getData () {
        return {
            carousel: {
                entries: [{
                    pictureUrl: 'http://via.placeholder.com/1920x192/444',
                    pictureCaption: 'Some fancy text'
                }, {
                    pictureUrl: 'http://via.placeholder.com/1920x192/555',
                    pictureCaption: '“A satisfied customer\'s quote”'
                }, {
                    pictureUrl: 'http://via.placeholder.com/1920x192/666',
                    pictureCaption: 'Some other text'
                }]
            },

            aboutMe: {
                id: 'aboutMe',
                title: 'About me',
                pictureUrl: 'res/pictures/man.jpeg',
                pictureCaption: 'Jan 01 1970',
                entries: [
                    'Minions ipsum bananaaaa ti aamoo! Aaaaaah butt poulet tikka masala me want bananaaa! Poulet tikka masala hana dul sae para tú. Po kass jiji baboiii poopayee jiji daa hana dul sae potatoooo tatata bala tu butt para tú.',
                    'Bananaaaa uuuhhh po kass ti aamoo! Jeje wiiiii. Daa tank yuuu! Belloo! Poulet tikka masala baboiii potatoooo para tú chasy. Chasy poopayee tank yuuu! Me want bananaaa! Gelatooo bee do bee do bee do wiiiii bee do bee do bee do bappleees bappleees hana dul sae belloo! Chasy. Hana dul sae para tú po kass daa.',
                    'Aaaaaah potatoooo uuuhhh daa potatoooo ti aamoo! Bee do bee do bee do. Pepete pepete daa po kass aaaaaah. Tank yuuu! tank yuuu! La bodaaa jiji tulaliloo tank yuuu! La bodaaa bananaaaa underweaaar ti aamoo!'
                ]
            },

            works: {
                id: 'works',
                title: 'Works',
                description: 'Minions ipsum belloo! Tank yuuu! Aaaaaah para tú aaaaaah jeje wiiiii bee do bee do bee do baboiii poopayee.',
                entries: [{
                    title: 'Thumbnail label',
                    description: 'Chasy daa uuuhhh hahaha bee do bee do bee do poopayee bee do bee do.',
                    pictureUrl: 'http://via.placeholder.com/720x320/222',
                    url: '#'
                }, {
                    title: 'Thumbnail label',
                    description: 'Tatata bala tu underweaaar me want bananaaa! Chasy baboiii poopayee.',
                    pictureUrl: 'http://via.placeholder.com/720x320/444',
                    url: '#'
                }, {
                    title: 'Thumbnail label',
                    description: 'Po kass tulaliloo gelatooo butt po kass ti aamoo! Pepete hahaha.',
                    pictureUrl: 'http://via.placeholder.com/720x320/666',
                    url: '#'
                }]
            },

            hobbies: {
                id: 'hobbies',
                title: 'Hobbies',
                description: 'Butt bee do bee do bee do butt jiji tank yuuu! Poulet tikka masala bee do bee do bee do daa potatoooo.',
                entries: [{
                    title: 'Thumbnail label',
                    description: 'Minions ipsum la bodaaa bananaaaa jeje baboiii bappleees pepete gelatooo para tú jeje baboiii.',
                    pictureUrl: 'http://via.placeholder.com/720x320/222',
                    url: '#'
                }, {
                    title: 'Thumbnail label',
                    description: 'Potatoooo daa hahaha po kass ti aamoo! Hahaha po kass underweaaar bodaaa banana jeje daa.',
                    pictureUrl: 'http://via.placeholder.com/720x320/444',
                    url: '#'
                }, {
                    title: 'Thumbnail label',
                    description: 'Tulaliloo po kass bee do bee do bee do chasy hahaha bee do bee do bee do po kass masala bee.',
                    pictureUrl: 'http://via.placeholder.com/720x320/666',
                    url: '#'
                }]
            },

            footer: {
                linksLabel: 'Find me on...',
                links: [{
                    label: 'Linkedin',
                    icon: 'fa-linkedin-square',
                    url: 'https://www.linkedin.com/in/jesusmiguelcruzcana'
                }, {
                    label: 'FaceBook',
                    icon: 'fa-facebook-square',
                    url: 'https://www.facebook.com/metaltxus'
                }, {
                    label: 'Twitter',
                    icon: 'fa-twitter-square',
                    url: 'https://twitter.com/MetalTxus'
                }],
                copyright: '© CC-BY-NC Jesús Miguel Cruz Cana'
            }
        }
    }

}]);