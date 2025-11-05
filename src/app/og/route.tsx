import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          backgroundImage:
            'linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f4f6 75%), linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '60px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxWidth: '1000px',
            margin: '0 40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '60px',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '40px',
                fontSize: '48px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              EK
            </div>
            <div>
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#111827',
                  margin: '0 0 10px 0',
                  lineHeight: '1.1',
                }}
              >
                Emirhan Kemal Kosem
              </h1>
              <p
                style={{
                  fontSize: '28px',
                  color: '#6b7280',
                  margin: '0',
                  fontWeight: '500',
                }}
              >
                Frontend Software Engineer
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            {['React', 'Next.js', 'TypeScript', 'GraphQL'].map(tech => (
              <div
                key={tech}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  fontSize: '20px',
                  fontWeight: '600',
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: '24px',
              color: '#6b7280',
              textAlign: 'center',
              marginTop: '40px',
              maxWidth: '800px',
              lineHeight: '1.4',
            }}
          >
            8+ years of experience building high-performance web applications
            <br />
            Based in Berlin • Specializing in accessibility & modern web
            standards
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
