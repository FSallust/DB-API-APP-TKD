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
        //Test du model Grade
        /*
        g1 = new db.grade({
            label: 'Demo',
            belt: 'Beige',
            level: 9
        });
        await  g1.save()
        */
        const grade = await db.grade.findOne().where('level').eq(42);
        const role = await db.role.findOne().where('label').eq('USER');
        const user = await db.user.findOne().where('lastname').eq('Sallusti');
        //console.log(grade);

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
        //Test du model role
        /*
        const r1 = new db.role({
            label: "MODERATOR"
        })
        await r1.save();
        console.log(r1);
        
        const r2 = new db.role({
            label: "USER"
        })
        await r2.save();
        console.log(r2);
        */
        //Test du model exam
        /*
        const e1 = new db.exam({
            mark: "75%",
            comment: "Bien joué",
            examdate: "2021-12-15",
            id_user: user._id
        })
        await e1.save();
        console.log(e1);
        */
        //Test du model exam
        /*
        const ev1 = new db.event({
            title: "Competition",
            description: "Le 14 juin 2022 - competition de combat",
            eventDate: "2022-06-14",
            id_user: user._id
        })
        await ev1.save();
        console.log(ev1);
        */
        //Test du model user

        const u2 = new db.user({
            lastname: "Mazzero",
            firstname: "Loris",
            password: "admin1234",
            birthdate: "1989-01-09",
            email: "mloris@gmail.com",
            presences: ["2022-01-10","2022-01-13"],
            id_role: role,
            id_grade: grade
        })
        await u2.save();
        console.log(u2);

    })
    .catch(e => {
        console.log(e);
    })