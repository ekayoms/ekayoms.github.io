text = """I woke up illuminated by the strong, white lights above me.
The room was different from what I was used to. It was bigger, and there were several beds next to mine. I had seen it before from the outside. “Observation”, wasn’t it? It definitively smelled different. Something in me knew that was the smell of cleaning products. Wait... cleaning?
“Hey, you, finally awake!” I heard a familiar voice, but couldn’t exactly see the source from my position.
“Vac...?” My voice was weak. I felt weak. But if it was any consolation, the headache was weaker too. “Weaker” meant it only hurt a lot, as opposed to being unbearable. Baby steps. But the eye patch still had to stay.
“How are you feeling, ma’am?” Vac rhetorically asked me. “I’m... really sorry I had to do that, but I had no choice.”
“Do... what? What did you do...?”
“That shock that knocked you out... that was me, ma’am. Again, sorry for that-”
“W-what? What was that for...?” I was genuinely clueless. I couldn’t remember what I was doing when that happened.
“It was for your safety, ma’am. You were in a deeply unstable mental and emotional state. I couldn’t let you... harm yourself.”
“Harm... myself...?”
Harm myself? What was he-
Oh, right, the stairs.
Oh.
“I see you remember. It’s best not to talk about it. You should be fine now.”
“Fine”...? Nope. I don’t think anyone would be fine in my situation. Sure, I had recovered my senses and wasn’t having a psychotic laughter attack anymore, but I was still stuck there. I was still going to die in that place, even if not due to doing something stupid to myself. But, silver lining, I would have a lot of time to think of a way to escape, lockdown or otherwise. The problem was, I wanted to leave stat.
I sighed again, resignedly. I could tell how grumpy my face looked as I laid there, still amazed at the combination of calamities that I found myself struck by. A perfect storm, no less. At the same time, some weight had arguably been removed from my shoulders; I had been pondering about how I would go about in the outside world, now that I at least had a "guide". All of that suddenly stopped mattering--it couldn't matter, as long as I was locked in that hospital.
With all of that said, the weird thoughts you'd expect started forming in my head. Why even bother escaping at this point? Assuming it was possible at all, would it be worth the effort? It wasn't what I wanted, but... sometimes we don't get a choice, do we? I hadn't chosen to be in that situation at all. Probably. But I had to live with it, so why not spend my energy on making the best of it, instead of wasting it on chasing an uncertain objective? I would die in there eventually, but that didn’t mean I wouldn’t live long. As far as I could tell, I had everything I needed: shelter, water, and food, my issues with the latter notwithstanding.
More importantly, Vac being around would be enough to prevent me from going insane. The simple fact I was on that bed after completely losing it minutes earlier was proof of that. Plus, he wouldn’t be condemned to his monotonous routine, either. I could find something to spend my time on. I could work on something, get good at something, and leave my tiny mark on this world, even if nobody would ever know. I likely had interests before whatever befell me, but those were gone, so I’d have to find new ones. The way Vac worked fascinated me. How could that little thing basically act like a living being? I wanted to find out everything behind it.
And... who said that door would be closed forever? Who said no one would find and rescue us? Okay, I had been there for over three years, but what could happen within a span of, say, ten? Nothing was impossible, right? Nothing was impossible. I was getting ahead of myself with my utter defeatism. I hadn’t been awake--or, for all intents and purposes, alive--for even a single day. Calm down, Patient 427. You will be fine. Everything will be fine."""

open("gen.txt", "w+", encoding="utf-8").write("\n".join([f"<p>{a.strip()}</p>" for a in text.split("\n")]))