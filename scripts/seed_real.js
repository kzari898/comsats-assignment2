require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: { type: String, unique: true },
  genre: String,
  publicationDate: Date,
  coverImage: String,
  description: String,
  authorIntroduction: String,
  awards: String,
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

const realBooksData = [
  // FICTION
  {
    title: "The Midnight Library", author: "Matt Haig", isbn: "978-0525559474", genre: "Fiction", date: "2020-08-13",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    desc: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    authorIntro: "Matt Haig is the number one bestselling author of Reasons to Stay Alive and six highly acclaimed novels for adults.",
    awards: "Goodreads Choice Award for Fiction (2020), British Book Award (2021)"
  },
  {
    title: "Where the Crawdads Sing", author: "Delia Owens", isbn: "978-0735219090", genre: "Fiction", date: "2018-08-14",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efac4?q=80&w=600&auto=format&fit=crop",
    desc: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark.",
    authorIntro: "Delia Owens is the co-author of three internationally bestselling nonfiction books about her life as a wildlife scientist in Africa.",
    awards: "New York Times Bestseller (Over 150 weeks), Reese's Book Club Pick"
  },
  {
    title: "1984", author: "George Orwell", isbn: "978-0451524935", genre: "Fiction", date: "1949-06-08",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop",
    desc: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell's nightmarish vision of a totalitarian.",
    authorIntro: "Eric Arthur Blair, known by his pen name George Orwell, was an English novelist, essayist, journalist and critic.",
    awards: "Prometheus Hall of Fame Award, Retro Hugo Award"
  },
  {
    title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", genre: "Fiction", date: "1925-04-10",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    desc: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when 'gin was the national drink and sex the national obsession'.",
    authorIntro: "Francis Scott Key Fitzgerald was an American novelist, essayist, and short story writer. He is best known for his novels depicting the flamboyance and excess of the Jazz Age.",
    awards: "Modern Library 100 Best Novels"
  },
  {
    title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0060935467", genre: "Fiction", date: "1960-07-11",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=600&auto=format&fit=crop",
    desc: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. Compassionate, dramatic, and deeply moving.",
    authorIntro: "Nelle Harper Lee was an American novelist widely known for To Kill a Mockingbird, published in 1960.",
    awards: "Pulitzer Prize for Fiction (1961), Presidential Medal of Freedom"
  },
  {
    title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "978-0316769488", genre: "Fiction", date: "1951-07-16",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop",
    desc: "A sprawling classic about teenage rebellion, alienation, and angst, featuring the iconic Holden Caulfield's journey through New York City.",
    authorIntro: "Jerome David Salinger was an American writer best known for his 1951 novel The Catcher in the Rye.",
    awards: "Time Magazine's 100 Best English-language Novels"
  },
  {
    title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0141439518", genre: "Fiction", date: "1813-01-28",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    desc: "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language.",
    authorIntro: "Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry.",
    awards: "BBC's The Big Read (No. 2)"
  },
  {
    title: "The Book Thief", author: "Markus Zusak", isbn: "978-0375842207", genre: "Fiction", date: "2005-09-01",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600&auto=format&fit=crop",
    desc: "It is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will become busier still. Liesel Meminger is a foster girl living outside of Munich.",
    authorIntro: "Markus Zusak is the author of five books, including the international bestseller, The Book Thief, which is translated into more than forty languages.",
    awards: "Michael L. Printz Honor Book, Boeke Prize"
  },
  {
    title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", isbn: "978-1501161933", genre: "Fiction", date: "2017-06-13",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop",
    desc: "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.",
    authorIntro: "Taylor Jenkins Reid is the New York Times bestselling author of Daisy Jones & The Six, Malibu Rising, and One True Loves.",
    awards: "Goodreads Choice Award nominee, Best Historical Fiction"
  },
  {
    title: "A Little Life", author: "Hanya Yanagihara", isbn: "978-0804172707", genre: "Fiction", date: "2015-03-10",
    image: "https://images.unsplash.com/photo-1483232539664-d89822fb5d3e?q=80&w=600&auto=format&fit=crop",
    desc: "A Little Life follows four college classmates—broke, adrift, and buoyed only by their friendship and ambition—as they move to New York in search of fame and fortune.",
    authorIntro: "Hanya Yanagihara is an American novelist, editor, and travel writer. She grew up in Hawaii.",
    awards: "Kirkus Prize Fiction Winner, Man Booker Prize Shortlist"
  },

  // SCIENCE FICTION
  {
    title: "Dune", author: "Frank Herbert", isbn: "978-0441172719", genre: "Science Fiction", date: "1965-08-01",
    image: "https://images.unsplash.com/photo-1547844140-625da8e58a74?q=80&w=600&auto=format&fit=crop", // Desert
    desc: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange.",
    authorIntro: "Frank Herbert was an American science fiction author best known for his 1965 novel Dune and its five sequels. Though he became famous for his novels, he also wrote short stories and worked as a newspaper journalist.",
    awards: "Hugo Award Winner, Nebula Award Winner"
  },
  {
    title: "Project Hail Mary", author: "Andy Weir", isbn: "978-0593135204", genre: "Science Fiction", date: "2021-05-04",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", // Space
    desc: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name.",
    authorIntro: "Andy Weir built a two-decade career as a software engineer until the success of his first published novel, The Martian, allowed him to live out his dream of writing full-time.",
    awards: "Goodreads Choice Award for Science Fiction (2021), Dragon Award"
  },
  {
    title: "The Martian", author: "Andy Weir", isbn: "978-0553418026", genre: "Science Fiction", date: "2014-02-11",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=600&auto=format&fit=crop", // Mars
    desc: "Six days ago, astronaut Mark Watney became one of the first people to walk on Mars. Now, he's sure he'll be the first person to die there.",
    authorIntro: "Andy Weir is an American novelist and former computer programmer. The Martian was famously originally self-published as series of blog posts.",
    awards: "Hugo Award for Best Presentation, Audie Award"
  },
  {
    title: "Foundation", author: "Isaac Asimov", isbn: "978-0553293357", genre: "Science Fiction", date: "1951-05-01",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop", // Nebulas
    desc: "For twelve thousand years the Galactic Empire has ruled supreme. Now it is dying. But only Hari Seldon, creator of the revolutionary science of psychohistory, can see into the future.",
    authorIntro: "Isaac Asimov was an American writer and professor of biochemistry at Boston University. He was known for his works of science fiction and popular science.",
    awards: "Hugo Award for Best All-Time Series (1966)"
  },
  {
    title: "Ender's Game", author: "Orson Scott Card", isbn: "978-0812550702", genre: "Science Fiction", date: "1985-01-15",
    image: "https://images.unsplash.com/photo-1541185962-113aa4ccb4af?q=80&w=600&auto=format&fit=crop", // Space array
    desc: "In order to develop a secure defense against a hostile alien race's next attack, government agencies breed child geniuses and train them as soldiers.",
    authorIntro: "Orson Scott Card is an American writer known best for his science fiction works. He is the first author to win both the Hugo and Nebula awards in consecutive years.",
    awards: "Hugo Award for Best Novel (1986), Nebula Award for Best Novel (1985)"
  },
  {
    title: "Neuromancer", author: "William Gibson", isbn: "978-0441569595", genre: "Science Fiction", date: "1984-07-01",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop", // Cyber
    desc: "Before the Internet was the Matrix. And before the Matrix was Neuromancer, the defining cyberspace novel. Case was the sharpest data-thief in the matrix, until he crossed the wrong people.",
    authorIntro: "William Gibson is an American-Canadian speculative fiction writer widely credited with pioneering the cyberpunk subgenre.",
    awards: "Hugo Award, Nebula Award, Philip K. Dick Award"
  },
  {
    title: "The Three-Body Problem", author: "Cixin Liu", isbn: "978-0765382030", genre: "Science Fiction", date: "2014-11-11",
    image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=600&auto=format&fit=crop", // Planets
    desc: "Set against the backdrop of China's Cultural Revolution, a secret military project sends signals into space to establish contact with aliens. An alien civilization on the brink of destruction captures the signal.",
    authorIntro: "Liu Cixin is a Chinese computer engineer and science fiction writer. He is a nine-time winner of the Galaxy Award, China's most prestigious literary science fiction award.",
    awards: "Hugo Award for Best Novel (2015), Ignotus Award"
  },
  {
    title: "Snow Crash", author: "Neal Stephenson", isbn: "978-0553380958", genre: "Science Fiction", date: "1992-06-01",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop", // Circuit board
    desc: "In reality, Hiro Protagonist delivers pizza for Uncle Enzo's CosoNostra Pizza Inc., but in the Metaverse, he's a warrior prince. Plunging headlong into the enigma of a new computer virus.",
    authorIntro: "Neal Stephenson is an American writer known for his works of speculative fiction. His novels have pushed the boundaries of cyberspace themes.",
    awards: "Arthur C. Clarke Award Nominee"
  },
  {
    title: "Childhood's End", author: "Arthur C. Clarke", isbn: "978-0345347954", genre: "Science Fiction", date: "1953-08-01",
    image: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=600&auto=format&fit=crop", // Alien ship vibe
    desc: "Without warning, giant silver ships from deep space appear in the skies above every major city on Earth. They are the Overlords, an alien race of infinite wisdom.",
    authorIntro: "Sir Arthur C. Clarke was an English science-fiction writer, science writer, futurist, inventor, undersea explorer, and television series host.",
    awards: "Retro Hugo Award Nominee"
  },
  {
    title: "Leviathan Wakes", author: "James S.A. Corey", isbn: "978-0316129084", genre: "Science Fiction", date: "2011-06-15",
    image: "https://images.unsplash.com/photo-1579710758949-323ecb697dd6?q=80&w=600&auto=format&fit=crop", // Space base
    desc: "Humanity has colonized the solar system - Mars, the Moon, the Asteroid Belt and beyond - but the stars are still out of our reach. Jim Holden is XO of an ice miner making runs from the rings of Saturn.",
    authorIntro: "James S. A. Corey is the pen name used by collaborators Daniel Abraham and Ty Franck, authors of the Expanse series.",
    awards: "Hugo Award for Best Series (2020), Locus Award Nominee"
  },

  // FANTASY
  {
    title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "978-0547928227", genre: "Fantasy", date: "1937-09-21",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop", // Shire like
    desc: "A great modern classic and the prelude to The Lord of the Rings. Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar.",
    authorIntro: "John Ronald Reuel Tolkien was an English writer, poet, philologist, and academic, universally acclaimed as the father of modern epic fantasy.",
    awards: "New York Herald Tribune Best Juvenile Fiction Award (1938)"
  },
  {
    title: "A Game of Thrones", author: "George R.R. Martin", isbn: "978-0553103540", genre: "Fantasy", date: "1996-08-06",
    image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=600&auto=format&fit=crop", // Swords/Winter
    desc: "Here is the first volume in George R. R. Martin’s magnificent cycle of novels that includes A Clash of Kings and A Storm of Swords. As a whole, this series comprises a genuine masterpiece of modern fantasy.",
    authorIntro: "George Raymond Richard Martin is an American novelist, screenwriter, and television producer. Author of the epic fantasy series A Song of Ice and Fire.",
    awards: "Locus Award Winner (1997), Hugo Award Nominee"
  },
  {
    title: "The Name of the Wind", author: "Patrick Rothfuss", isbn: "978-0756404741", genre: "Fantasy", date: "2007-03-27",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop", // Magic
    desc: "Told in Kvothe's own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen.",
    authorIntro: "Patrick Rothfuss is an American writer of epic fantasy. He is best known for his projected trilogy The Kingkiller Chronicle.",
    awards: "Quill Award, Alex Award"
  },
  {
    title: "Mistborn: The Final Empire", author: "Brandon Sanderson", isbn: "978-0765311788", genre: "Fantasy", date: "2006-07-25",
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=600&auto=format&fit=crop", // Ash
    desc: "For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler reigned.",
    authorIntro: "Brandon Sanderson is an American author of epic fantasy and science fiction. He is best known for the Cosmere fictional universe.",
    awards: "Romantic Times Reviewers' Choice Award"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isbn: "978-0590353427", genre: "Fantasy", date: "1997-06-26",
    image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=600&auto=format&fit=crop", // Castle
    desc: "Harry Potter has never played a sport while flying on a broomstick, but he is about to become a wizard.",
    authorIntro: "J.K. Rowling is the author of the record-breaking, multi-award-winning Harry Potter novels. Loved by fans worldwide.",
    awards: "National Book Award, British Book Award"
  },
  {
    title: "The Way of Kings", author: "Brandon Sanderson", isbn: "978-0765365279", genre: "Fantasy", date: "2010-08-31",
    image: "https://images.unsplash.com/photo-1599815919632-4d2be73c71de?q=80&w=600&auto=format&fit=crop", // Storm
    desc: "Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike.",
    authorIntro: "Brandon Sanderson is arguably the most prolific modern epic fantasy author today.",
    awards: "David Gemmell Legend Award"
  },
  {
    title: "American Gods", author: "Neil Gaiman", isbn: "978-0380789030", genre: "Fantasy", date: "2001-06-19",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop", // Dark sky
    desc: "Shadow had done three years in prison. He was just trying to keep his head down and do his time. Then his wife dies in a car accident just before his release.",
    authorIntro: "Neil Gaiman is an English author of short fiction, novels, comic books, graphic novels, non-fiction, audio theatre, and films.",
    awards: "Hugo, Nebula, and Bram Stoker Awards"
  },
  {
    title: "The Lies of Locke Lamora", author: "Scott Lynch", isbn: "978-0553588941", genre: "Fantasy", date: "2006-06-27",
    image: "https://images.unsplash.com/photo-1519098901909-b1553a1190af?q=80&w=600&auto=format&fit=crop", // Venice/City
    desc: "An orphan’s life is harsh. But Locke Lamora has dodged death, and is now part of a crew of elite con artists known as the Gentleman Bastards.",
    authorIntro: "Scott Lynch is an American fantasy author who wrote the internationally best-selling Gentleman Bastard sequence.",
    awards: "British Fantasy Award Nominee"
  },
  {
    title: "The Golden Compass", author: "Philip Pullman", isbn: "978-0440418320", genre: "Fantasy", date: "1995-07-09",
    image: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?q=80&w=600&auto=format&fit=crop", // Snow
    desc: "Lyra is rushing to the cold, far North, where witch clans and armored bears rule. Her uncle Asriel is trying to build a bridge to a parallel world.",
    authorIntro: "Philip Pullman is an English novelist. He is the author of several best-selling books, including the fantasy trilogy His Dark Materials.",
    awards: "Carnegie Medal, Guardian Children's Fiction Prize"
  },
  {
    title: "Assassin's Apprentice", author: "Robin Hobb", isbn: "978-0553573398", genre: "Fantasy", date: "1995-05-01",
    image: "https://images.unsplash.com/photo-1601758177266-bc599de87702?q=80&w=600&auto=format&fit=crop", // Castle tower
    desc: "Young Fitz is the bastard son of the noble Prince Chivalry, raised in the shadow of the royal court by his father's gruff stableman. He is secretly trained in the arts of the assassin.",
    authorIntro: "Robin Hobb is a pen name of American writer Margaret Astrid Lindholm Ogden. Recognized as one of the preeminent authors of epic fantasy.",
    awards: "British Fantasy Award Nominee"
  },

  // MYSTERY
  {
    title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", isbn: "978-0307454546", genre: "Mystery", date: "2005-08-01",
    image: "https://images.unsplash.com/photo-1478201736111-209217faed68?q=80&w=600&auto=format&fit=crop", // Dark swedish
    desc: "Harriet Vanger, a scion of one of Sweden's wealthiest families disappeared over forty years ago. Her octogenarian uncle continues to seek the truth.",
    authorIntro: "Stieg Larsson, who lived in Sweden, was the editor in chief of the magazine Expo and a leading expert on anti-democratic, right-wing extremist organizations.",
    awards: "Glass Key Award, Macavity Award"
  },
  {
    title: "Gone Girl", author: "Gillian Flynn", isbn: "978-0307588371", genre: "Mystery", date: "2012-06-05",
    image: "https://images.unsplash.com/photo-1505322022379-7a3b378eb260?q=80&w=600&auto=format&fit=crop", // Diary
    desc: "On a warm summer morning in North Carthage, Missouri, it is Nick and Amy Dunne's fifth wedding anniversary. Presents are being wrapped and reservations are being made when Amy suddenly disappears.",
    authorIntro: "Gillian Flynn is an American writer. Flynn has published three novels, Sharp Objects, Dark Places, and Gone Girl, all three of which have been adapted for film or television.",
    awards: "Edgar Award Nominee, Goodreads Choice Award for Mystery"
  },
  {
    title: "The Da Vinci Code", author: "Dan Brown", isbn: "978-0385504201", genre: "Mystery", date: "2003-03-18",
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=600&auto=format&fit=crop", // Museum
    desc: "While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum.",
    authorIntro: "Dan Brown is the author of numerous #1 bestselling pop-thrillers, making him one of the most commercially successful authors of all time.",
    awards: "British Book Award, Book Sense Book of the Year"
  },
  {
    title: "And Then There Were None", author: "Agatha Christie", isbn: "978-0062073488", genre: "Mystery", date: "1939-11-06",
    image: "https://images.unsplash.com/photo-1502842445831-2db8bb8cba67?q=80&w=600&auto=format&fit=crop", // Island
    desc: "Ten people, each with something to hide and something to fear, are invited to a isolated mansion on Indian Island by a host who, surprisingly, fails to appear. One by one they are murdered.",
    authorIntro: "Agatha Christie is the world's best-selling mystery writer and the creator of Hercule Poirot and Miss Marple.",
    awards: "World's Best-Selling Mystery Novel"
  },
  {
    title: "The Hound of the Baskervilles", author: "Arthur Conan Doyle", isbn: "978-0451528018", genre: "Mystery", date: "1902-04-01",
    image: "https://images.unsplash.com/photo-1510360822-790104675e2f?q=80&w=600&auto=format&fit=crop", // Foggy moor
    desc: "'Mr. Holmes, they were the footprints of a gigantic hound!' The death of Sir Charles Baskerville brings Sherlock Holmes and Dr. Watson to the misty, eerie moors of Devonshire.",
    authorIntro: "Sir Arthur Conan Doyle was a British writer and medical doctor. He created the character Sherlock Holmes in 1887 for A Study in Scarlet.",
    awards: "One of the Top 100 Mystery Novels of All Time"
  },
  {
    title: "Murder on the Orient Express", author: "Agatha Christie", isbn: "978-0062073501", genre: "Mystery", date: "1934-01-01",
    image: "https://images.unsplash.com/photo-1520658467471-15b706c6ed6a?q=80&w=600&auto=format&fit=crop", // Train
    desc: "Just after midnight, a snowdrift stops the Orient Express in its tracks. The luxurious train is surprisingly full for the time of the year, but by the morning it is one passenger fewer.",
    authorIntro: "Agatha Christie is known throughout the world as the Queen of Crime.",
    awards: "Voted #2 of the best Agatha Christie novels"
  },
  {
    title: "The Silence of the Lambs", author: "Thomas Harris", isbn: "978-0312924584", genre: "Mystery", date: "1988-05-19",
    image: "https://images.unsplash.com/photo-1498642730303-3118cfd1b11b?q=80&w=600&auto=format&fit=crop", // Dark room
    desc: "A serial murderer known only by a grotesquely apt nickname—Buffalo Bill—is stalking women. He has a purpose, but no one can fathom it, for the bodies are discovered in different states.",
    authorIntro: "Thomas Harris is an American writer, best known for a series of suspense novels about his most famous character, Hannibal Lecter.",
    awards: "Bram Stoker Award for Best Novel"
  },
  {
    title: "Big Little Lies", author: "Liane Moriarty", isbn: "978-0399167065", genre: "Mystery", date: "2014-07-29",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop", // Beach
    desc: "A murder...A tragic accident...Or just parents behaving badly? What’s indisputable is that someone is dead. Madeline is a force to be reckoned with. She's funny, biting, and passionate; she remembers everything and forgives no one.",
    authorIntro: "Liane Moriarty is the Australian author of eight internationally best-selling novels.",
    awards: "Davitt Award, Goodreads Choice Award"
  },
  {
    title: "In the Woods", author: "Tana French", isbn: "978-0143113492", genre: "Mystery", date: "2007-05-17",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop", // Woods
    desc: "As dusk approaches a small Dublin suburb in the summer of 1984, mothers begin to call their children home. But on this warm evening, three children do not return from the dark and silent woods.",
    authorIntro: "Tana French is an American-Irish writer and theatrical actress. She is the author of the critically acclaimed Dublin Murder Squad series.",
    awards: "Edgar Award for Best First Novel, Macavity Award"
  },
  {
    title: "The Girl on the Train", author: "Paula Hawkins", isbn: "978-1594634024", genre: "Mystery", date: "2015-01-13",
    image: "https://images.unsplash.com/photo-1473618147250-705bf108269e?q=80&w=600&auto=format&fit=crop", // Train window
    desc: "EVERY DAY THE SAME. Rachel takes the same commuter train every morning and night. Every day she rattles down the track, flashes past a stretch of cozy suburban homes, and stops at the signal that allows her to daily watch the same couple breakfasting on their deck.",
    authorIntro: "Paula Hawkins worked as a journalist for fifteen years before turning her hand to fiction.",
    awards: "Goodreads Choice Award for Mystery & Thriller"
  },

  // NON-FICTION
  {
    title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", isbn: "978-0062316097", genre: "Non-Fiction", date: "2011-09-04",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop", // Book pages
    desc: "One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—homo sapiens. What happened to the others? And what may happen to us?",
    authorIntro: "Yuval Noah Harari is an Israeli historian and a professor in the Department of History at the Hebrew University of Jerusalem.",
    awards: "National Library of China's Wenjin Book Award"
  },
  {
    title: "Thinking, Fast and Slow", author: "Daniel Kahneman", isbn: "978-0374533557", genre: "Non-Fiction", date: "2011-10-25",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600&auto=format&fit=crop", // Brain / Abstract
    desc: "The phenomenal New York Times Bestseller by Nobel Prize-winner Kahneman. Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.",
    authorIntro: "Daniel Kahneman was an Israeli-American psychologist and economist notable for his work on the psychology of judgment and decision-making.",
    awards: "National Academy of Sciences Best Book Award"
  },
  {
    title: "Educated", author: "Tara Westover", isbn: "978-0399590504", genre: "Non-Fiction", date: "2018-02-20",
    image: "https://images.unsplash.com/photo-1510257007621-0a568b200b3e?q=80&w=600&auto=format&fit=crop", // Mountains
    desc: "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom.",
    authorIntro: "Tara Westover is an American memoirist, essayist, and historian. Her memoir Educated debuted at #1 on The New York Times bestseller list.",
    awards: "Alex Award, Goodreads Choice Award for Memoir"
  },
  {
    title: "Quiet: The Power of Introverts", author: "Susan Cain", isbn: "978-0307352156", genre: "Non-Fiction", date: "2012-01-24",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=600&auto=format&fit=crop", // Stillness
    desc: "At least one-third of the people we know are introverts. They are the ones who prefer listening to speaking; who innovate and create but dislike self-promotion; who favor working on their own over working in teams.",
    authorIntro: "Susan Cain is an American writer and lecturer, and author of the 2012 non-fiction book Quiet, which argues that modern Western culture misunderstands and undervalues the traits and capabilities of introverted people.",
    awards: "Goodreads Choice Award for Nonfiction"
  },
  {
    title: "Outliers: The Story of Success", author: "Malcolm Gladwell", isbn: "978-0316017930", genre: "Non-Fiction", date: "2008-11-18",
    image: "https://images.unsplash.com/photo-1499597369399-56fb08dafb2a?q=80&w=600&auto=format&fit=crop", // Success/Abstract
    desc: "In this stunning book, Malcolm Gladwell takes us on an intellectual journey through the world of 'outliers'--the best and the brightest, the most famous and the most successful.",
    authorIntro: "Malcolm Gladwell is a journalist, author, and public speaker. He has been a staff writer for The New Yorker since 1996.",
    awards: "Time's 100 Most Influential People"
  },
  {
    title: "Guns, Germs, and Steel", author: "Jared Diamond", isbn: "978-0393317558", genre: "Non-Fiction", date: "1997-03-01",
    image: "https://images.unsplash.com/photo-1548048026-b11bb5c245fc?q=80&w=600&auto=format&fit=crop", // Continents
    desc: "In this 'artful, informative, and delightful' (William H. McNeill, New York Review of Books) book, Jared Diamond convincingly argues that geographical and environmental factors shaped the modern world.",
    authorIntro: "Jared Diamond is an American geographer, historian, anthropologist, and author best known for his popular science books The Third Chimpanzee, Guns, Germs, and Steel, Collapse.",
    awards: "Pulitzer Prize for General Non-Fiction (1998)"
  },
  {
    title: "A Brief History of Time", author: "Stephen Hawking", isbn: "978-0553380163", genre: "Non-Fiction", date: "1988-03-01",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", // Space
    desc: "Told in language we all can understand, A Brief History of Time plunges into the exotic realms of black holes and quarks, of antimatter and 'arrows of time,' of the big bang and a bigger God.",
    authorIntro: "Stephen William Hawking was an English theoretical physicist, cosmologist, and author who was director of research at the Centre for Theoretical Cosmology.",
    awards: "Royal Society Science Books Prize"
  },
  {
    title: "Freakonomics", author: "Steven D. Levitt, Stephen J. Dubner", isbn: "978-0060731335", genre: "Non-Fiction", date: "2005-04-12",
    image: "https://images.unsplash.com/photo-1518183214770-9c675c9bfdf0?q=80&w=600&auto=format&fit=crop", // Economics abstract
    desc: "Which is more dangerous, a gun or a swimming pool? What do schoolteachers and sumo wrestlers have in common? How much do parents really matter?",
    authorIntro: "Steven Levitt is a professor of economics at the University of Chicago and a recipient of the John Bates Clark Medal.",
    awards: "Quill Award for Business"
  },
  {
    title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", isbn: "978-1400052189", genre: "Non-Fiction", date: "2010-02-02",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=600&auto=format&fit=crop", // Cells/Lab
    desc: "Her name was Henrietta Lacks, but scientists know her as HeLa. She was a poor Southern tobacco farmer who worked the same land as her slave ancestors, yet her cells—taken without her knowledge—became one of the most important tools in medicine.",
    authorIntro: "Rebecca Skloot is an American science writer. Henrietta Lacks was her debut book.",
    awards: "National Academies Communication Award"
  },
  {
    title: "Born a Crime", author: "Trevor Noah", isbn: "978-0399588174", genre: "Non-Fiction", date: "2016-11-15",
    image: "https://images.unsplash.com/photo-1517409249081-3068e1b6f0e3?q=80&w=600&auto=format&fit=crop", // South africa
    desc: "The compelling, inspiring, and comically sublime story of one man’s coming-of-age, set during the twilight of apartheid and the tumultuous days of freedom that followed.",
    authorIntro: "Trevor Noah is a South African comedian, television host, actor, and political commentator. He hosted The Daily Show.",
    awards: "NAACP Image Award for Outstanding Literary Work, Thurber Prize for American Humor"
  },

  // BIOGRAPHY
  {
    title: "Steve Jobs", author: "Walter Isaacson", isbn: "978-1451648539", genre: "Biography", date: "2011-10-24",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop", // Apple/Tech
    desc: "Based on more than forty interviews with Jobs conducted over two years—as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues.",
    authorIntro: "Walter Isaacson is an American author, journalist, and professor. He has been the President and CEO of the Aspen Institute, a nonpartisan educational and policy studies organization.",
    awards: "Financial Times and McKinsey Business Book of the Year Award Nominee"
  },
  {
    title: "Alexander Hamilton", author: "Ron Chernow", isbn: "978-0143034759", genre: "Biography", date: "2004-04-26",
    image: "https://images.unsplash.com/photo-1560935105-df85d8fb85eb?q=80&w=600&auto=format&fit=crop", // Architecture
    desc: "In the first full-length biography of Alexander Hamilton in decades, Ron Chernow tells the riveting story of a man who overcame all odds to shape, inspire, and scandalize the newborn America.",
    authorIntro: "Ron Chernow is an American writer, journalist, historian, and biographer. His bestselling works feature founding fathers of the United States.",
    awards: "George Washington Book Prize"
  },
  {
    title: "The Diary of a Young Girl", author: "Anne Frank", isbn: "978-0553296983", genre: "Biography", date: "1947-06-25",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600&auto=format&fit=crop", // Writing
    desc: "Discovered in the attic in which she spent the last years of her life, Anne Frank's remarkable diary has since become a world classic—a powerful reminder of the horrors of war and an eloquent testament to the human spirit.",
    authorIntro: "Annelies Marie 'Anne' Frank was a German-Dutch diarist of Jewish heritage. One of the most discussed Jewish victims of the Holocaust.",
    awards: "Listed on Le Monde's 100 Books of the Century"
  },
  {
    title: "Leonardo da Vinci", author: "Walter Isaacson", isbn: "978-1501139154", genre: "Biography", date: "2017-10-17",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop", // Canvas/Paint
    desc: "Based on thousands of pages from Leonardo's astonishing notebooks and new discoveries about his life and work, Walter Isaacson weaves a narrative that connects his art to his science.",
    authorIntro: "Walter Isaacson's mastery of the biography genre allows him to illuminate the lives of geniuses in extraordinary ways.",
    awards: "Goodreads Choice Award for History & Biography"
  },
  {
    title: "Becoming", author: "Michelle Obama", isbn: "978-1524763138", genre: "Biography", date: "2018-11-13",
    image: "https://images.unsplash.com/photo-1544716278-e513176f20b5?q=80&w=600&auto=format&fit=crop", // Presidential/Women
    desc: "An intimate, powerful, and inspiring memoir by the former First Lady of the United States. In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world.",
    authorIntro: "Michelle LaVaughn Robinson Obama is an American attorney and author who served as First Lady of the United States from 2009 to 2017.",
    awards: "Grammy Award for Best Spoken Word Album, NAACP Image Award"
  },
  {
    title: "Einstein: His Life and Universe", author: "Walter Isaacson", isbn: "978-0713999988", genre: "Biography", date: "2007-04-10",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=600&auto=format&fit=crop", // Universe
    desc: "How did his mind work? What made him a genius? Isaacson's biography shows how his scientific imagination sprang from the rebellious nature of his personality.",
    authorIntro: "Walter Isaacson is the author of celebrated biographies on figures like Benjamin Franklin and Steve Jobs.",
    awards: "National Academies Communication Award"
  },
  {
    title: "Titan: The Life of John D. Rockefeller, Sr.", author: "Ron Chernow", isbn: "978-0679757436", genre: "Biography", date: "1998-05-15",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop", // Corporate buildings
    desc: "John D. Rockefeller, Sr.—history's first billionaire and the patriarch of America's most famous dynasty—is an icon widely known but little understood.",
    authorIntro: "Ron Chernow's meticulously researched, critically acclaimed biographies are renowned for their depth and narrative drive.",
    awards: "National Book Critics Circle Award Nominee"
  },
  {
    title: "Churchill: A Life", author: "Martin Gilbert", isbn: "978-0805096570", genre: "Biography", date: "1991-11-01",
    image: "https://images.unsplash.com/photo-1533423996375-f914abaac44d?q=80&w=600&auto=format&fit=crop", // English style
    desc: "A sprawling deeply insightful single-volume biography of the famed British Prime Minister by his official biographer.",
    authorIntro: "Sir Martin John Gilbert was a British historian and honorary Fellow of Merton College, Oxford.",
    awards: "Wolfson History Prize"
  },
  {
    title: "Washington: A Life", author: "Ron Chernow", isbn: "978-0143119968", genre: "Biography", date: "2010-10-05",
    image: "https://images.unsplash.com/photo-1587823521360-154c1fc99723?q=80&w=600&auto=format&fit=crop", // Americana
    desc: "With a breadth and depth matched by no other one-volume biography of George Washington, this crisply paced narrative carries the reader through his adventurous early years, his heroic exploits with the Continental Army, his presiding over the Constitutional Convention, and his magnificent performance as America's first president.",
    authorIntro: "Ron Chernow is the acclaimed biographer whose work inspired the musical 'Hamilton'.",
    awards: "Pulitzer Prize for Biography (2011)"
  },
  {
    title: "Shoe Dog: A Memoir by the Creator of Nike", author: "Phil Knight", isbn: "978-1501135910", genre: "Biography", date: "2016-04-26",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop", // Shoes
    desc: "In this candid and riveting memoir, for the first time ever, Nike founder and board chairman Phil Knight shares the inside story of the company’s early days as an intrepid start-up and its evolution into one of the world’s most iconic, game-changing, and profitable brands.",
    authorIntro: "Phil Knight is the founder of Nike, Inc. and served as chairman and CEO for decades.",
    awards: "Goodreads Choice Award Nominee"
  },

  // ROMANCE
  {
    title: "Outlander", author: "Diana Gabaldon", isbn: "978-0440212560", genre: "Romance", date: "1991-06-01",
    image: "https://images.unsplash.com/photo-1466074818788-b7eb48b261b0?q=80&w=600&auto=format&fit=crop", // Highlands
    desc: "In 1945, Claire Randall, a former combat nurse, is back from the war and reunited with her husband on a second honeymoon, when she walks through a standing stone in one of the ancient circles that dot the British Isles. Suddenly she is a Sassenach—an 'outlander'—in a Scotland torn by war and raiding border clans in the year of our Lord 1743.",
    authorIntro: "Diana Gabaldon is the author of the award-winning, #1 New York Times-bestselling Outlander novels.",
    awards: "RITA Award for Best Romance"
  },
  {
    title: "The Notebook", author: "Nicholas Sparks", isbn: "978-0446605236", genre: "Romance", date: "1996-10-01",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop", // Couples setting
    desc: "At thirty-one, Noah Calhoun, back in coastal North Carolina after World War II, is haunted by images of the girl he lost more than a decade earlier. At twenty-nine, socialite Allie Nelson is about to marry a wealthy lawyer, but she cannot stop thinking about the boy who long ago stole her heart.",
    authorIntro: "Nicholas Sparks is an American novelist and screenwriter. He has published over twenty novels, all New York Times bestsellers.",
    awards: "New York Times Bestseller List (Over a year)"
  },
  {
    title: "Me Before You", author: "Jojo Moyes", isbn: "978-0143124542", genre: "Romance", date: "2012-01-05",
    image: "https://images.unsplash.com/photo-1518104593124-ac2eeb9aaeb4?q=80&w=600&auto=format&fit=crop", // Emotional/Window
    desc: "Louisa Clark is an ordinary girl living an exceedingly ordinary life. She takes a badly needed job working for ex-Master of the Universe Will Traynor, who is wheelchair-bound after a motorcycle accident.",
    authorIntro: "Jojo Moyes is an English journalist and, since 2002, a romance novelist and screenwriter. She is one of only a few authors to have twice won the Romantic Novel of the Year Award.",
    awards: "Galaxy National Book Awards Winner"
  },
  {
    title: "The Fault in Our Stars", author: "John Green", isbn: "978-0142424179", genre: "Romance", date: "2012-01-10",
    image: "https://images.unsplash.com/photo-1499244571948-7cc81ac16555?q=80&w=600&auto=format&fit=crop", // Stars
    desc: "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
    authorIntro: "John Green is the award-winning, #1 bestselling author of Looking for Alaska, An Abundance of Katherines, Paper Towns.",
    awards: "Goodreads Choice Award for Young Adult Fiction, Printz Honor Book"
  },
  {
    title: "Twilight", author: "Stephenie Meyer", isbn: "978-0316015844", genre: "Romance", date: "2005-10-05",
    image: "https://images.unsplash.com/photo-1518621845118-2dfe0f7416b3?q=80&w=600&auto=format&fit=crop", // Forest
    desc: "When Isabella Swan moves to the gloomy town of Forks and meets the mysterious, alluring Edward Cullen, her life takes a thrilling and terrifying turn.",
    authorIntro: "Stephenie Meyer is an American novelist and film producer, best known for her vampire romance series Twilight.",
    awards: "British Book Award for Children's Book of the Year"
  },
  {
    title: "A Walk to Remember", author: "Nicholas Sparks", isbn: "978-0446608954", genre: "Romance", date: "1999-10-01",
    image: "https://images.unsplash.com/photo-1506744626753-1fa30fd22541?q=80&w=600&auto=format&fit=crop", // Path
    desc: "Every April, when the wind smells of both the sea and lilacs, Landon Carter remembers 1958, his last year at Beaufort High and a girl named Jamie Sullivan.",
    authorIntro: "Nicholas Sparks is renowned for writing deeply moving love stories set in the American South.",
    awards: "Publishers Weekly Bestseller"
  },
  {
    title: "The Time Traveler's Wife", author: "Audrey Niffenegger", isbn: "978-1476764832", genre: "Romance", date: "2003-01-01",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=600&auto=format&fit=crop", // Clock abstract
    desc: "A funny, often poignant, marvelously paced story of a marriage plagued by an unusual problem: the husband's unpredictable and involuntary time travel.",
    authorIntro: "Audrey Niffenegger is a visual artist and writer based in Chicago.",
    awards: "British Book Award for Popular Fiction"
  },
  {
    title: "P.S. I Love You", author: "Cecelia Ahern", isbn: "978-1401308585", genre: "Romance", date: "2004-02-01",
    image: "https://images.unsplash.com/photo-1469145942442-8700a6e344e4?q=80&w=600&auto=format&fit=crop", // Letters
    desc: "Holly couldn't live without her husband Gerry, until the day she had to. They were the kind of young couple who could finish each other's sentences. When Gerry succumbs to a terminal illness, Holly's world shatters, until she finds a bundle of letters left by Gerry.",
    authorIntro: "Cecelia Ahern is an Irish novelist whose work has sold over 25 million copies in more than fifty countries.",
    awards: "Irish Book Award Winner"
  },
  {
    title: "Eleanor & Park", author: "Rainbow Rowell", isbn: "978-1250012579", genre: "Romance", date: "2013-02-26",
    image: "https://images.unsplash.com/photo-1499540633125-484965b60031?q=80&w=600&auto=format&fit=crop", // Bus/Retro
    desc: "Set over the course of one school year in 1986, this is the story of two star-crossed misfits—smart enough to know that first love almost never lasts, but brave and desperate enough to try.",
    authorIntro: "Rainbow Rowell writes books. Sometimes she writes about adults, sometimes about teenagers. But she always writes about people who talk a lot.",
    awards: "Printz Honor Book, Boston Globe-Horn Book Award"
  },
  {
    title: "Red, White & Royal Blue", author: "Casey McQuiston", isbn: "978-1250316776", genre: "Romance", date: "2019-05-14",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", // Abstract vivid
    desc: "First Son Alex Claremont-Diaz is the closest thing to a prince this side of the Atlantic. When his mother became President, he was cast as the American equivalent of a young royal. Then he meets the actual Prince of England, Henry.",
    authorIntro: "Casey McQuiston is a New York Times bestselling author of romantic comedies.",
    awards: "Goodreads Choice Award for Romance (2019)"
  }
];

async function seedDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    console.log('Clearing existing books...');
    await Book.deleteMany({});

    console.log('Inserting incredibly rich seed data (70 real books with real author intros and awards)...');
    
    // Transform arrays into the schema shape explicitly with Ratings added randomly to simulate organic activity
    const booksToInsert = realBooksData.map((book) => ({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      genre: book.genre,
      publicationDate: new Date(book.date),
      coverImage: book.image,
      description: book.desc,
      authorIntroduction: book.authorIntro,
      awards: book.awards,
      averageRating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)), // Between 3.5 and 5.0
      totalReviews: Math.floor(Math.random() * 50000)
    }));
    
    await Book.insertMany(booksToInsert);
    
    console.log(`Database seeded successfully with ${booksToInsert.length} rich books!`);
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
