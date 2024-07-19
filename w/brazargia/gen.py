text = """My annoyed expression had changed to a slight, hopeful smile. I turned on my side on my bed. Being finally able to do that was awesome. I could now see Vac on the other side of the room, using some kind of... device? on top of a table by the wall. I saw something weird for the first time: he could actually get taller if necessary--there was a hydraulic system between his wheels and his main body making his height... adjustable. I felt a little jealous, before quickly remembering I already had more than enough non-organic body parts.
“Vac...?” I asked. “What are you up to?”
“Me, ma’am?” he replied, briefly turning to me with a smiling emoji on his screen. I could see he was looking at a screen too--a monitor on top of the table. “I’m getting your blood exam results!”
“Wha...?” I exclaimed, trailing off as I slowly turned to look at my left arm. There was another curative on it, way bigger and more well made than the previous. Noticing it almost felt like it activated the pain. Damn you, Vac. At least I didn’t have to see the actual thing, though.
“There you go, ma’am,” he said as he lowered his body and wheeled across the room back towards me, “the results are here.”
“Ugh. Go ahead. This better have been worth it.”
“It says here you have mild anemia, ma’am, a trend that has been slowly increasing in your latest tests. That’s probably why you feel constantly tired.”
Oddly, I knew what that word meant, apparently enough to try being witty about it:
“And what should I do about it, Doctor Vac? Should I chew an iron bar?”
“No, ma’am. Taking the iron supplements I left on the bedside table will be enough.” I realised he had, in fact, left them there. I found it oddly heartwarming. It was... considerate of him to try “fixing” me.
“You should also take the vitamin supplements I gave you. A, B, C, E and K. D, well... you should too, but the lack of sunlight outside as of right now won’t help much.”
Lack of sunlight, already? For how long had I been out? Come to think of it, it was probably around dusk that I had tried to leave, given the color of the dome’s sun rays.
“Finally, your white cell levels are normal, as in every blood work of yours... except for the first ones, three years ago.”
“Huh?” That attracted my curiosity a bit.
“You had elevated levels of white cells at that time, yes, meaning you were probably fighting an infection.”
Fighting an infection. “Biohazard threat”. You can’t be serious. They didn’t abandon me because of that, right...? That was ridiculous. If that was the case, why didn’t they just...
I ended up thinking too loudly.
“...Why didn’t they just put me down?” I mumbled. Vac heard that very clearly. My face turned red as his screen switched to a disapproving emoji:
“Stop with those kinds of thoughts, ma’am, before I put you to sleep again.”
I stared at him in silence and simply started pointing at every single thing that was wrong with me. He couldn’t deny it: me having survived was one hell of an anomaly.
“Ma’am... you still want to leave, don’t you?” he said after a while and after the robotic equivalent of a sigh--the noise from within him becoming louder. His gears were turning, literally and figuratively. “I can see it in your face. You’re trying to convince yourself that staying is what you want, because you think it’s hopeless. You’re lying to yourself.”
OUCH.
“What, you don’t think it’s a lost cause...?” I pointed out: “Because that door isn’t going anywhere.”
“The door isn’t going anywhere, indeed, but that doesn’t mean it can’t open. I haven’t ever tested this, but...”
“But?!” I lifted my head up from the pillow. I could tell my eyes were glowing.
“There is a chance that the lockdown can be overridden by one thing, and one thing only: a fire alarm.”
A... fire... alarm?!
I squinted my eyes while looking directly at where I imagined his camera was:
“Say that again, please?”
“Yes, ma’am, you heard that right. A fire alarm. Think about it: the lockdown was designed to keep people from moving in or out, but it couldn’t know on which side of that door they would end up. In fact, you should be thankful for that.”
Right. In theory, people could be stuck inside or outside this wing of the hospital. It didn’t matter--I was living proof one could very well survive inside. The point was to separate people. The infected from the non-infected, it can be deduced. That still bothered me. Had I actually won that lottery too? Just me? It couldn’t be.
“So, if there were people inside and a fire broke out, it wouldn’t be a good idea to have them stuck in there, no matter the circumstances,” Vac continued. His expression then changed to a smug one. “Of course, this was only implemented because nobody would be stupid enough to start a fire just to circumvent a lockdown.” He was staring directly into my soul as he said that.
Hey, I hadn’t said anything yet!"""

open("gen.txt", "w+", encoding="utf-8").write("\n".join([f"<p>{a.strip()}</p>" for a in text.split("\n")]))