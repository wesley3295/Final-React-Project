# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

 users = User.create([{ username: 'wes3295', password_digest:'123456',email:"wes@wes.com" },
                      { username: 'joey2slice', password_digest:'123456',email:"joey@joey.com "},
                      { username: 'discere', password_digest:'123456',email:'chales@charles.com' }])

                      
categories= Category.create([{name:"recipe"},
                             {name:"home"},
                             {name:"art"}
                            ])


 diys = Diy.create([{title:"Apple Pie",supplies:['Milk','Eggs','Apples','Cinnamon','Sugar','Flour'],instructions:["step1 #{LoremIpsum.lorem_ipsum(words:25)}","step2 #{LoremIpsum.lorem_ipsum(words:25)}","step3#{LoremIpsum.lorem_ipsum(words:25)}","step4#{LoremIpsum.lorem_ipsum(words:25)}"], user_id:users[0].id, category_id:categories[0].id},
                    {title:"Chicken Coop",supplies:['80ft 2x4', '1/2 screws','heat resistant roofing', '15ft of plywood'],instructions:["step1 #{LoremIpsum.lorem_ipsum(words:25)}","step2 #{LoremIpsum.lorem_ipsum(words:25)}","step3#{LoremIpsum.lorem_ipsum(words:25)}","step4#{LoremIpsum.lorem_ipsum(words:25)}"], user_id:users[1].id, category_id:categories[1].id},
                    {title:"Macaroni Snake",supplies:['Macaroni', 'Glue'],instructions:["step1 #{LoremIpsum.lorem_ipsum(words:25)}","step2 #{LoremIpsum.lorem_ipsum(words:25)}","step3#{LoremIpsum.lorem_ipsum(words:25)}","step4#{LoremIpsum.lorem_ipsum(words:25)}"], user_id:users[2].id, category_id:categories[2].id},
                   ])

 tools= Tool.create([
                     {name:"Hammer"},
                     {name:"Drill"},
                     {name:"Wisk"},
                     {name:"Measuring Cup"},
                     {name:"Pie Pan"},
                     {name:"Spatula"},
                     {name:"Knife"},
                     {name:"Washcloth"}
                    ])

 diytools= DiyTool.create([
                     {diy_id:diys[1].id,tool_id:tools[0].id},
                     {diy_id:diys[1].id,tool_id:tools[1].id},
                     {diy_id:diys[0].id,tool_id:tools[2].id},
                     {diy_id:diys[0].id,tool_id:tools[3].id},
                     {diy_id:diys[0].id,tool_id:tools[4].id},
                     {diy_id:diys[0].id,tool_id:tools[5].id},
                     {diy_id:diys[0].id,tool_id:tools[6].id},
                     {diy_id:diys[2].id,tool_id:tools[7].id}
                    ])

