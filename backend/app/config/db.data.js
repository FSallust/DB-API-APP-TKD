//DB
const db = require("./app/models");

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB!");       
    })
    .catch(err => {
        console.log("Cannot connect to MongoDB!", err);
        process.exit();
    })
    .then(async () => {
        //#region Grade datas
        g0 = new db.grade({
            label: '10 KUP',
            belt: 'Ceinture BLANCHE',
            level: 0
        });
        g1 = new db.grade({
            label: '9 KUP',
            belt: 'Ceinture JAUNE',
            level: 1
        });
        g2 = new db.grade({
            label: '8 KUP',
            belt: 'Ceinture ORANGE',
            level: 2
        });
        g3 = new db.grade({
            label: '7 KUP',
            belt: 'Ceinture VERTE',
            level: 3
        });
        g4 = new db.grade({
            label: '6 KUP',
            belt: 'Ceinture BLEUE',
            level: 4
        });
        g5 = new db.grade({
            label: '5 KUP',
            belt: 'Ceinture BLEUE-ROUGE',
            level: 5
        });
        g6 = new db.grade({
            label: '4 KUP',
            belt: 'Ceinture ROUGE',
            level: 6
        });
        g7 = new db.grade({
            label: '3 KUP',
            belt: 'Ceinture ROUGE',
            level: 7
        });
        g8 = new db.grade({
            label: '2 KUP',
            belt: 'Ceinture ROUGE',
            level: 8
        });
        g9 = new db.grade({
            label: '1 KUP',
            belt: 'Ceinture ROUGE',
            level: 9
        });
        g10 = new db.grade({
            label: '1 DAN',
            belt: 'Ceinture NOIRE',
            level: 10
        });
        g11 = new db.grade({
            label: '2 DAN',
            belt: 'Ceinture NOIRE',
            level: 11
        });
        g12 = new db.grade({
            label: '3 DAN',
            belt: 'Ceinture NOIRE',
            level: 12
        });
        await  g0.save();
        await  g1.save();
        await  g2.save();
        await  g3.save();
        await  g4.save();
        await  g5.save();
        await  g6.save();
        await  g7.save();
        await  g8.save();
        await  g9.save();
        await  g10.save();
        await  g11.save();
        await  g12.save();
        //#endregion

        //Test d'une question
        /*
        const q1 = new db.question({
            question : "Quel est le sens de la vie ?",
            answers : [
                { label : 'Manger', isRight: true },
                { label : 'Dormir', isRight: false },
                { label : 'Aller en cours', isRight: false },
                { label : 'Travailler', isRight: false },
                { label : 'Vivre', isRight: false },
                { label : '42', isRight: true }
            ], 
            level: grade._id
        })
        await q1.save();
        */
        //const question = await db.question.findById('61e6dcb9e7cc693d1782d958').populate('level');
        //console.log(question);
        //Test du model theory
        /*
        const t1 = new db.theory({
            label: "Passage de grade pour ceinture Chartreuse",
            link: "lien_pour_ceinture_chartreuse.com",
            id_grade: grade._id
        })
        await t1.save();
        console.log(t1);
        */
        //#region Role datas
        const r1 = new db.role({
            label: "ADMIN"
        })
        await r1.save();

        const r2 = new db.role({
            label: "MODERATOR"
        })
        await r2.save();
        
        const r3 = new db.role({
            label: "USER"
        })
        await r3.save();
        //#endregion
        
        //#region First Admin
        //Const to set the first admin
        const grade = await db.grade.findOne().where('level').eq(12);
        const role = await db.role.findOne().where('label').eq('ADMIN');

        const u1 = new db.user({
            lastname: "Mazzero",
            firstname: "Loris",
            password: "",
            birthdate: "",
            email: "",
            presences: [],
            id_role: role,
            id_grade: grade
        })
        await u1.save();
        //#endregion
    })
    .catch(e => {
        console.log(e);
    })