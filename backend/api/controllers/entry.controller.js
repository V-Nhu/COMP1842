const Entry = require('../models/Entry')

function getEntryWriteErrorMessage(err) {
  if (err?.code === 11000 && err?.keyPattern?.issueCode) {
    return 'Issue code already exists. Please use a different issue code.'
  }

  return err.message
}

// GET all entries
exports.getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find()
    res.json(entries)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET single entry by ID
exports.getEntryById = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id)
    if (!entry) return res.status(404).json({ message: 'Entry not found' })
    res.json(entry)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST create new entry
exports.createEntry = async (req, res) => {
  try {
    const entry = new Entry({
      issueCode: req.body.issueCode,
      responseText: req.body.responseText,
      category: req.body.category
    })
    const newEntry = await entry.save()
    res.status(201).json(newEntry)
  } catch (err) {
    res.status(400).json({ message: getEntryWriteErrorMessage(err) })
  }
}

// PUT update entry by ID
exports.updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      {
        issueCode: req.body.issueCode,
        responseText: req.body.responseText,
        category: req.body.category
      },
      { new: true, runValidators: true }
    )
    if (!entry) return res.status(404).json({ message: 'Entry not found' })
    res.json(entry)
  } catch (err) {
    res.status(400).json({ message: getEntryWriteErrorMessage(err) })
  }
}

// DELETE entry by ID
exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id)
    if (!entry) return res.status(404).json({ message: 'Entry not found' })
    res.json({ message: 'Entry deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET search by issueCode (extra feature)
exports.searchByIssueCode = async (req, res) => {
  try {
    const entries = await Entry.find({
      issueCode: { $regex: req.query.code, $options: 'i' }
    })
    res.json(entries)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}