module.exports = {
    sections: [
        {
            name: 'newbie',
            title: 'Навигация новичка',
            icon: require('./assets/icons/newbie.svg'),
        },
        {
            name: 'craft',
            title: 'Создание предметов',
            icon: require('./assets/icons/craft.svg'),
        },
        {
            name: 'economics',
            title: 'Экономика и торговля',
            icon: require('./assets/icons/pickpocket.svg'),
        },
        {
            name: 'fractions',
            title: 'Фракции и гильдии',
            icon: require('./assets/icons/speech.svg'),
        },
        {
            name: 'war',
            title: 'Гражданская война',
            icon: require('./assets/icons/flags.svg'),
        },
        {
            name: 'skills',
            title: 'Система боя и навыков ',
            icon: require('./assets/icons/sword.svg'),
        },
        {
            name: 'magic',
            title: 'Магия и её изучение',
            icon: require('./assets/icons/mage.svg'),
        }
    ],


    newbieItems: [
        {
            title: 'Шахты и фермы',
            icon1: require('./assets/icons/farm.svg'),
            icon2: require('./assets/icons/mine.svg'),
            text: 'В получении первых денег и ресурсов поможет работа на шахте, ферме или лесопилке.',
        },
        {
            title: 'Крафт и торговля',
            icon1: require('./assets/icons/craft.svg'),
            icon2: require('./assets/icons/pickpocket.svg'),
            text: 'Добывай ресурсы, созидай, реализуй созданные предметы на рыночной площади любого города.',
        },
        {
            title: 'Магия и снаряжение',
            icon1: require('./assets/icons/mage.svg'),
            icon2: require('./assets/icons/sword.svg'),
            text: 'Уничтожай противников силами оружия и магии с новым балансом, делающим сражения интересными.',
        },
        {
            title: 'Гильдии и фракции',
            icon1: require('./assets/icons/guild-dark.svg'),
            icon2: require('./assets/icons/guild-thief.svg'),
            text: 'Хочешь стать великим магом, профессиональным вором или искусным воином? Вступай в любую из доступных фракций Скайрима, и найди единомышленников и помощь в нелёгком деле.',
        },
        {
            title: 'ПВЕ и ПВП контент',
            icon1: require('./assets/icons/bow.svg'),
            icon2: require('./assets/icons/flags.svg'),
            text: 'Отправляйтесь с друзьями в жуткие склепы косить драугров ради древних артефактов или же примите участие в масштабных битвах за города, выбрав одну из двух сторон гражданской войны.',
        },
        {
            title: 'Общение и социум',
            icon1: require('./assets/icons/speech.svg'),
            icon2: require('./assets/icons/family.svg'),
            text: 'Вступление во фракцию, создание своей семьи, формирование банды поможет достичь максимального взаимодействия с обитателями провинции.',
        }
    ],

    craftItems: [
        {
            title: 'Алхимия',
            icon: require('./assets/icons/alchemy.svg'),
            tabId: 'craft-1',
            header: 'Настало время раскрыть истинный потенциал алхимии',
            text: 'Ужасающие яды и чудотворные зелья требуют качественных ингредиентов. Наиболее распространённые алхимические реагенты растеряли свои свойства, а действительно ценные стали попадаться крайне редко. Опасные приключения ждут тебя в самых потаённых уголках провинции в поисках особо редких ингредиентов для зельеварения, а некоторые из них будет достать практически невозможно.',
            icons: [
                require('./assets/craft-img/alchemy-decor-1.png'),
                require('./assets/craft-img/alchemy-decor-2.png'),
                require('./assets/craft-img/alchemy-decor-3.png')
            ]
        },
        {
            title: 'Кузнечное дело',
            icon: require('./assets/icons/smith.svg'),
            tabId: 'craft-2',
            header: 'Настало время раскрыть истинный потенциал кузнечного дела',
            text: 'Металл, огонь и пот - вот, что отличает простого обывателя от кузнеца. Тебе предстоит потратить многие часы упорного труда, прежде чем сковать клинок, способный хотя бы поцарапать врага. С этого момента тебе придётся искать всевозможные материалы, использовать разные компоненты, чтобы продвинуться в познании кузнечного дела.',
            icons: [
                require('./assets/craft-img/smithing-decor-1.png'),
                require('./assets/craft-img/smithing-decor-2.png'),
                require('./assets/craft-img/smithing-decor-3.png')
            ]
        },
        {
            title: 'Зачарование',
            icon: require('./assets/icons/enchanting.svg'),
            tabId: 'craft-3',
            header: 'Настало время раскрыть истинный потенциал Пентаграммы душ',
            text: 'Работа с Пентаграммой душ - скверное занятие, но прибыльное! Скверно оно тем, что приходится отнимать души живых существ ради создания противовеса в существующем оружии или броне. Тебе придётся отправится в опасные и мрачные места ради камней душ и погубить не одно существо, чтобы достичь высот в столь непростом деле - зачаровании.',
            icons: [
                require('./assets/craft-img/enchanting-decor-1.png'),
                require('./assets/craft-img/enchanting-decor-2.png'),
                require('./assets/craft-img/enchanting-decor-3.png')
            ]
        }
    ]
};
