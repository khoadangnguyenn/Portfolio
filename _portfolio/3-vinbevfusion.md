---
title: "Is it the model or the pose? Debugging a bird's-eye-view map"
excerpt: "URA × VinFast engineering project, completed. A road-map model looked broken. The cause was the car's heading in the labels."
tagline: "Debugging a bird's-eye-view road map on Vietnamese driving data: the labels' heading held mean IoU near 0.40, and the model was fine."
collection: portfolio
when: "Jan – Oct 2026"   # from CV PDF 2026-11-08
start: "2026-01"
end: "2026-10"
role: "Technical lead, 5 people"
context: "URA Research Group, HCMUT × VinFast"
stack: [BEVFusion, nuScenes format, LiDAR, six cameras]
results:
  - "74.2% mIoU and 89.4% drivable-area IoU for BEVFusion trained on Vietnamese driving data."
  - "Mean IoU rose from about 0.40 to about 0.74 on the same validation frames after the label heading was corrected."
teaser: /images/fig_heading.jpg
teaser_alt: "The same drive with yaw from direction of motion (left) and from the inertial heading (right)"
teaser_caption: "The same drive with yaw from the direction of motion (left) and from the inertial heading (right)."
card_summary: "BEVFusion for bird's-eye-view lane and free-space maps on Vietnamese driving data; the failure traced to heading in the labels, and the model was fine."
card_result: "74.2% mIoU, 89.4% drivable-area IoU"
venue: "URA × VinFast"
summary: "A road map predicted from car cameras looked like a model failure. The cause was the car's heading in the training labels. Corrected labels raised mean IoU from about 0.40 to about 0.74 on the same validation frames."
thumb: /images/fig_heading.jpg
thumb_alt: "The same drive with yaw from direction of motion (left) and from the inertial heading (right)"
permalink: /portfolio/vinbevfusion/
---
We adapted BEVFusion, a model that fuses six cameras and a LiDAR into a bird's-eye-view map, to recordings from Vietnamese roads. After converting the data into the nuScenes format, validation accuracy stalled at a level that looked like the limit of the architecture. Before changing the model, we wanted to know whether the labels were telling it the truth.

## My role

I was the technical lead of a five-person team and owned benchmarking and runtime measurement. The diagnosis below was a team effort, so I write it as “we”.

## A decision: suspect the pose before the model

There were two reasonable next steps: tune the network, or audit how each label was placed. Map labels are drawn around the car using its recorded heading, so a wrong heading rotates the whole label. The recorded heading turned out to be the direction of motion, not the direction the car was facing. It read zero whenever the car stopped and pointed backwards whenever the car reversed. A gyroscope reading confirmed the car's body was not actually turning in those moments. The fix was to take heading from the inertial navigation system and fall back to the last valid value.

<figure><img src="{{ site.baseurl }}/images/fig_heading.jpg" alt="" loading="lazy" /><figcaption>The same drive seen two ways. Left: yaw taken from the direction of motion. When the car stops, the yaw snaps to a fixed value. When it reverses, it flips by 180°, and the road label rotates with it. Right: yaw from the inertial heading keeps the label on the road.</figcaption></figure>

With the same configuration, the same random seed and the same validation frames, retraining on corrected labels raised mean intersection-over-union from about 0.40 to about 0.74. The label pixels themselves barely changed, which rules out a different dataset as the explanation.

## Limits and next test

Training and validation came from the same recording, so the number says nothing yet about new roads. The model also runs well above the latency target. The next test is a validation split taken from a different drive.
