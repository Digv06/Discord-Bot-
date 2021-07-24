const Discord = require('discord.js')
const client = new Discord.Client();
const PREFIX = '$';

require('dotenv').config();

client.on("ready" , () => {
    console.log("Connected as : ", client.user.tag)

    client.user.setActivity("Movies ",{type: 'WATCHING'})
})

client.on('message', async (message) => {
    if(message.author.bot) return;
    console.log( `[${message.author.tag}] sent : ${message.content}`);
    if(message.content === 'hello'){
        message.channel.send('Hello there!!')
    }

    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args]= message.content.trim().substring(PREFIX.length).split(/\s+/)
        console.log(CMD_NAME)
        console.log(args)
        
        if(CMD_NAME === 'kick'){
            if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permission' )

            if(args.length === 0) return message.reply("Please provide valid ID")
            const member = message.guild.members.cache.get(args[0]);
            console.log(member)
            message.channel.send('Kicked the user.')

            if(member){
                member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked.`))
                .catch((err) => message.channel.send(`I don't have permissions of kicking :(`))

            }else{
                message.channel.send('Member not found')
            }


        }else if(CMD_NAME === 'ban'){
            if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You do not have permission' )
            if(args.length === 0) return message.reply("Please provide valid ID")

            try{
                const user= await message.guild.members.ban(args[0])
                message.channel.send(user," Banned successfully")
            }catch(err){
                console.log(err)
                message.channel.send('Error occured because member is not found.')
            }             
        }
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    const name = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id)
    if(reaction.message.id === '866321604941840474'){
        switch(name){
            case '💪':
                member.roles.add()
            case '💯':

            case '😎':

        }
    }
})


client.login("ODYzNzk1MjM3MDc1NDE5MTU2.YOsGAQ.owMH5T7m9e8HqaYnmSTOX9pmleI")