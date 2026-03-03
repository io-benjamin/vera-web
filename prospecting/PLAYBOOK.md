# Vera Prospecting Playbook

## The Strategy

Find local businesses that:
1. Have a Google Business Profile (they're legit)
2. Have good reviews (they care about reputation)
3. **Don't have a website** (that's your opening)

Then reach out with a friendly, personalized message.

---

## Step 1: Find Leads

### Google Maps Method

1. Go to [Google Maps](https://www.google.com/maps)
2. Search: `{category} in {city}` (e.g., "hair salons in richmond va")
3. Click through listings
4. Look for businesses where:
   - No "Website" button
   - Or website button goes to Facebook/Instagram (not a real site)
   - Good ratings (4+ stars)
   - Has phone number

### High-Value Categories

These businesses need websites but often don't have them:

**Food & Drink**
- Restaurants (not chains)
- Food trucks
- Bakeries
- Catering
- Coffee shops

**Personal Services**
- Hair salons / Barber shops
- Nail salons
- Spas / Massage
- Tattoo shops
- Personal trainers

**Home Services**
- Plumbers
- Electricians
- HVAC
- Landscaping
- Cleaning services
- Handyman

**Other**
- Auto repair
- Pet groomers
- Photography
- Tutoring
- Yoga / Fitness studios
- Florists

### What Makes a Good Lead

✅ **Yes:**
- 4+ star rating
- 20+ reviews
- Been around 1+ years
- Has phone number listed
- Local/independent (not a chain)

❌ **Skip:**
- Under 3.5 stars (might have issues)
- Brand new (no budget yet)
- National chains
- Already has a decent website

---

## Step 2: Record the Lead

Add to `leads.csv`:

```
name,category,location,phone,email,google_maps_url,rating,reviews,notes,status,contacted_date,response
Maria's Kitchen,Restaurant,Richmond VA,804-555-1234,,https://goo.gl/maps/xxx,4.6,89,Great tacos - no website,new,,
```

### Finding Contact Info

- **Phone**: Usually on Google listing
- **Email**: Check Google listing, or search "{business name} {city} email"
- **Owner name**: Sometimes on Google, or check:
  - LinkedIn
  - Facebook page
  - Yelp "About" section
  - Local news/press

---

## Step 3: Reach Out

See `templates.md` for email templates.

### Outreach Sequence

| Day | Action |
|-----|--------|
| 0 | Send initial email |
| 3-5 | Follow-up #1 if no response |
| 10-14 | Final follow-up |

### Best Times to Send

- **Tuesday-Thursday** morning (9-11am local)
- Avoid Monday (inbox overload) and Friday (weekend mode)

---

## Step 4: Track Everything

Update `leads.csv` status:
- `new` - Just found
- `contacted` - Email sent
- `replied` - They responded
- `call_scheduled` - Meeting booked
- `quoted` - Sent proposal
- `won` - Closed deal 🎉
- `lost` - Said no
- `no_response` - No reply after 3 attempts

---

## Metrics to Track

**Weekly goals:**
- Find 20-30 leads
- Send 15-20 initial emails
- Get 3-5 responses
- Book 1-2 calls

**Conversion benchmarks:**
- Email open rate: 20-40%
- Response rate: 5-15%
- Call booking rate: 30-50% of responses
- Close rate: 30-50% of calls

---

## Tips

1. **Batch your work**: Find leads one day, outreach another
2. **Personalize everything**: Generic = spam folder
3. **Be helpful, not pushy**: You're offering value
4. **Follow up**: Most deals close on follow-up 2-3
5. **Track what works**: Test subject lines, adjust

---

## Scripts

### If they ask "How much?"

"It depends on what you need, but most of my clients pay between $499-999 for a complete site. I can put together a quick quote after a 10-minute call to understand what you're looking for."

### If they say "Not right now"

"Totally understand — timing is everything. Mind if I check back in a month or two? And feel free to reach out anytime at hello@tryvera.dev."

### If they say "I have a nephew who does websites"

"That's great! If you ever need a second opinion or things don't work out, I'm here. Good luck with the project!"

(Don't fight it — plant the seed and move on)

---

## Daily Workflow

1. **Morning (30 min)**: Find 5-10 new leads
2. **Midday (30 min)**: Send outreach emails
3. **End of day (15 min)**: Follow up on pending, update tracking

That's it. Consistency > intensity.
