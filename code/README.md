# Core implementation

[Actual C++ excerpts](core-excerpts.cpp) · [Source locations and hashes](source-map.json)

These are selected lines from the UE implementation associated with the measured Renderer, rather than the webpage's pseudocode. Separate source regions are marked explicitly; the file is for code review and depends on its original Renderer context.

| Region | Optimization |
|---|---|
| [Median split](core-excerpts.cpp#L3) | Partition decal centers on their longest axis with `nth_element`; keep balanced leaf ranges. |
| [Node rejection](core-excerpts.cpp#L11) | Reject a whole node missed by the primary view and, when present, its paired view. Emit whole-leaf candidates conservatively, then run UE's exact checks. |
| [Snapshot reuse](core-excerpts.cpp#L22) | Rebuild geometry/proxy storage only when the render-thread snapshot is invalid. Omitted collection code is identified in the excerpt. |
| [Scene order](core-excerpts.cpp#L29) | Sort candidate ordinals back to scene order before the original visibility helper and unchanged stage sorting. |

The integration prepares a const snapshot before asynchronous work and captures it by value. Sharing preserves snapshot storage; proxy lifetime relies on UE's task Finish window, with reader-count assertions at mutations. Geometry mutations invalidate the scene's cached snapshot. Padded bounds and always-tested exceptional entries keep candidate selection conservative. Mode1 falls back for small scenes, high mutation/candidate rates, or unsupported numeric inputs; Mode2 compares against the original result. Demo settings: leaf capacity 16, small-scene threshold 1,024.

The source map records original file locations and hashes checked against the benchmark archive. This documents the existing implementation; the published measurements remain unchanged.

The public C++ selection is 30 lines including attribution and annotations. Its purpose is discussion of the optimization under [Epic's Engine Code snippet provision, section 5(a)(ii)](https://www.unrealengine.com/eula/unreal). Copyright notices are retained.
