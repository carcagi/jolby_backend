#!/usr/bin/node
const techs = [
  {name: "Python", expresion: /Python/ig},
  {name: "Django", expresion: /Django/ig},
  {name: "Flask", expresion: /Flask/ig},
  {name: "C++", expresion: /C\+\+/ig},
  {name: "C#", expresion: /C#/ig},
  {name: "C", expresion: /^C\s/ig},
  {name: "C", expresion: /^C,\s/ig},
  {name: "C", expresion: /\sC\s/ig},
  {name: "Golang", expresion: /Golang/ig},
  {name: "Java", expresion: /Java\s/ig},
  {name: "Java", expresion: /Java,/ig},
  {name: "Java", expresion: /\sJava$/ig},
  {name: "Javascript", expresion: /Javascript/ig},
  {name: "JS", expresion: /JS/ig},
  {name: "NodeJs", expresion: /NodeJs/ig},
  {name: "React", expresion: /React\s/ig},
  {name: "React", expresion: /React,/ig},
  {name: "React", expresion: /React$/ig},
  {name: "React", expresion: /\sReact/ig},
  {name: "Vue", expresion: /Vue/ig},
  {name: "MySQL", expresion: /MySQL/ig},
  {name: "SQL", expresion: /\sSQL/ig},
  {name: "NoSQL", expresion: /NoSQL/ig},
  {name: "MongoDB", expresion: /MongoDb$/ig},
  {name: "MongoDB", expresion: /Mongo$/ig},
  {name: "AWS", expresion: /Aws/ig},
  {name: "AWS", expresion: /Amazon\sweb\sservices/ig},
  {name: "Ruby", expresion: /Ruby\s,/ig},
  {name: "Ruby", expresion: /Ruby,/ig},
  {name: "Ruby", expresion: /Ruby$/ig},
  {name: "HTML", expresion: /HTML/ig},
  {name: "CSS", expresion: /CSS/ig},
  {name: "Angular", expresion: /Angular/ig},
  {name: "Ruby on Rails", expresion: /Ruby\son\sRails/ig},
  {name: "Unity", expresion: /Unity,/ig},
  {name: "Unity", expresion: /\sUnity\s/ig},
  {name: "DataBases", expresion: /DataBases/ig},
  {name: "Full Stack", expresion: /Fullstack/ig},
  {name: "Full Stack", expresion: /Full-stack/ig},
  {name: "Full Stack", expresion: /Full\sstack/ig},
  {name: "Frontend", expresion: /Frontend/ig},
  {name: "Frontend", expresion: /Front-end/ig},
  {name: "Frontend", expresion: /Front\send/ig},
  {name: "Backend", expresion: /Backend/ig},
  {name: "Backend", expresion: /Back-end/ig},
  {name: "Backend", expresion: /Back\send/ig},
  {name: "DevOps", expresion: /Devops/ig},
];
exports.getTagsFrom = function (desc) {
  const tags = []
  for(let i = 0; techs[i]; i++) {
    if (techs[i].expresion.test(desc)) {
      tags.push(techs[i].name);
    }
  }
  return tags;
};